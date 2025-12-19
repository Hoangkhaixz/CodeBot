const logger = require("../utils/log.js");

class ReconnectManager {
    constructor() {
        this.retryCount = 0;
        this.maxRetries = 5;
        this.retryDelay = 5000; // 5 seconds
    }

    // Auto reconnect khi mất kết nối
    async reconnect(api) {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            logger(`🔄 Thử kết nối lại lần ${this.retryCount}/${this.maxRetries}`, "RECONNECT");
            
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));
            
            try {
                // Kiểm tra kết nối
                const userID = api.getCurrentUserID();
                if (userID) {
                    logger("✅ Kết nối thành công!", "RECONNECT");
                    this.retryCount = 0; // Reset counter
                    return true;
                }
            } catch (error) {
                logger("❌ Kết nối thất bại: " + error.message, "RECONNECT");
                return this.reconnect(api); // Retry
            }
        } else {
            logger("❌ Đã thử kết nối " + this.maxRetries + " lần, dừng lại", "RECONNECT");
            return false;
        }
    }

    // Keep-alive: gửi heartbeat mỗi 5 phút
    startHeartbeat(api) {
        setInterval(() => {
            try {
                const userID = api.getCurrentUserID();
                if (!userID) {
                    logger("⚠️ Mất kết nối, thử khôi phục...", "HEARTBEAT");
                    this.reconnect(api);
                }
            } catch (error) {
                logger("❌ Heartbeat check lỗi: " + error.message, "HEARTBEAT");
            }
        }, 5 * 60 * 1000); // 5 minutes
    }
}

module.exports = new ReconnectManager();
