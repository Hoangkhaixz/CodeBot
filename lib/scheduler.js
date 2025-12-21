const moment = require("moment-timezone");
const cron = require("node-cron");
const logger = require("../utils/log.js");

class Scheduler {
    constructor(api) {
        this.api = api;
        this.threadIDs = [];
    }

    // Cập nhật danh sách nhóm
    updateThreadIDs(threads) {
        this.threadIDs = threads || [];
    }

    // Bắt đầu scheduler
    start() {
        if (!this.api) {
            logger("API không sẵn sàng, bỏ qua scheduler", "SCHEDULER");
            return;
        }

        // 🌅 8 GIỜ SÁNG - Chúc buổi sáng tốt lành
        cron.schedule(
            "0 8 * * *",
            () => {
                this.sendToAllThreads(
                    "🌅✨ 𝐂𝐡𝐮́𝐜 𝐦𝐨𝐢 𝐧𝐠𝐮𝐞̀𝐦 𝐧𝐚̀𝐲 𝐭𝐭𝐥 𝐟𝐚̀n 𝐢 𝐤𝐢𝐞̂́u ✨🌅\n\n" +
                        "🌸 Đến công việc nhanh tay 🌸\n" +
                        "💪 Mạnh mẽ vượt qua mọi thử thách 💪\n" +
                        "😊 Tươi cười một ngày đầy năng lượng 😊\n\n" +
                        "🌻🌷🌹🌺🌸 Buổi sáng tốt lành! 🌸🌹🌷🌻",
                );
                logger("✅ Gửi tin nhắn chúc buổi sáng 8h", "SCHEDULER");
            },
            { timezone: "Asia/Ho_Chi_Minh" },
        );

        // 🍽️ 12 GIỜ TRƯA - Chúc đi ăn trưa
        cron.schedule(
            "0 12 * * *",
            () => {
                this.sendToAllThreads(
                    "🍽️😋 𝐓𝐫𝐨𝐚𝐢 𝐝𝐢 ă𝐧 𝐭𝐫𝐮𝐚̀𝐧𝐠 𝐤 𝐦𝐚̣̂𝐧𝐠 𝐦𝐨̃𝐞 😋🍽️\n\n" +
                        "🍲 Ăn uống ngon miệng 🍲\n" +
                        "🥘 Bụng no tròn tứ phía 🥘\n" +
                        "😊 Hạnh phúc ngày trưa 😊\n\n" +
                        "🍜🍝🍛🍱 Mạnh mõe! 🍱🍛🍝🍜",
                );
                logger("✅ Gửi tin nhắn chúc ăn trưa 12h", "SCHEDULER");
            },
            { timezone: "Asia/Ho_Chi_Minh" },
        );

        // 🌙 8 GIỜ TỐI - Chúc tối vui gia đình
        cron.schedule(
            "0 20 * * *",
            () => {
                this.sendToAllThreads(
                    "🌙💕 𝐓𝐨́𝐢 𝐧𝐡𝐢𝐞̀𝐮 𝐧𝐢𝐞̀𝐦 𝐯𝐮𝐢 𝐛𝐞̂𝐧 𝐠𝐢𝐚 đ𝐢𝐧𝐡 💕🌙\n\n" +
                        "👨‍👩‍👧‍👦 Ôm ấp những người yêu thương 👨‍👩‍👧‍👦\n" +
                        "💑 Tình cảm ấm áp bên gia đình 💑\n" +
                        "😊 Niềm vui tràn đầy hạnh phúc 😊\n\n" +
                        "🌟💫⭐ Tối nhiều niềm vui! ⭐💫🌟",
                );
                logger("✅ Gửi tin nhắn chúc tối 20h", "SCHEDULER");
            },
            { timezone: "Asia/Ho_Chi_Minh" },
        );

        // 🏆 THỨ 7 & CHỦ NHẬT 19h55 - Gọi vào đua đội (CÓ TAG EVERYONE)
        cron.schedule(
            "55 19 * * 0,6",
            () => {
                this.sendToAllThreadsWithMentions(
                    "🏆🔥 CÒN 5 PHÚT NHÉ! 🔥🏆\n\n" +
                        "⏰ Đến giờ thi đấu đội rồi 8h ⏰\n" +
                        "💪 Mọi người vào CBI nào 💪\n" +
                        "🎮 Chuẩn bị chiến thắng! 🎮\n\n" +
                        "🚀 Các bạn SAVIOR vào đua đội nhé! 🚀\n" +
                        "👊 Chiến!!! 👊",
                );
                logger(
                    "✅ Gửi tin nhắn (CÓ TAG EVERYONE) gọi vào đua đội 19h55",
                    "SCHEDULER",
                );
            },
            { timezone: "Asia/Ho_Chi_Minh" },
        );

        // 🌙 1 GIỜ KHUYA - Chúc ngủ ngon cho clan
        cron.schedule(
            "0 1 * * *",
            () => {
                this.sendToAllThreads(
                    "😴✨ 𝐆𝐮̃𝐬 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐜𝐥𝐚𝐧 ❤️ ✨😴\n\n" +
                        "🌛 Đêm nay ngủ sâu giấc 🌛\n" +
                        "🛌 Mơ những giấc mơ đẹp 🛌\n" +
                        "⭐ Buổi sáng mai tươi tắn 😴\n" +
                        "💤 Tình cảm ơi, ngủ đi 💤\n\n" +
                        "🌟💤🌙 Ngủ ngon clan! Buổi sáng tái ngộ! 🌙💤🌟",
                );
                logger("✅ Gửi tin nhắn chúc ngủ ngon 1h khuya", "SCHEDULER");
            },
            { timezone: "Asia/Ho_Chi_Minh" },
        );

        logger("🚀 Scheduler khởi động thành công!", "SCHEDULER");
    }

    // Gửi tin nhắn đến tất cả nhóm
    sendToAllThreads(message) {
        if (!this.threadIDs || this.threadIDs.length === 0) {
            logger("⚠️ Không có nhóm nào để gửi tin nhắn", "SCHEDULER");
            return;
        }

        this.threadIDs.forEach((threadID) => {
            try {
                this.api.sendMessage(message, threadID, (err) => {
                    if (err) {
                        logger(
                            `❌ Lỗi gửi tin nhắn tới ${threadID}: ${err.message}`,
                            "SCHEDULER",
                        );
                    }
                });
            } catch (error) {
                logger(
                    `❌ Exception khi gửi tin nhắn: ${error.message}`,
                    "SCHEDULER",
                );
            }
        });
    }

    // Gửi tin nhắn với tag everyone
    sendToAllThreadsWithMentions(message) {
        if (!this.threadIDs || this.threadIDs.length === 0) {
            logger("⚠️ Không có nhóm nào để gửi tin nhắn", "SCHEDULER");
            return;
        }

        this.threadIDs.forEach((threadID) => {
            try {
                this.api.getThreadInfo(threadID, (err, threadInfo) => {
                    if (err) {
                        logger(
                            `❌ Lỗi lấy info nhóm ${threadID}: ${err.message}`,
                            "SCHEDULER",
                        );
                        return;
                    }

                    const participants = threadInfo.participantIDs || [];
                    const botID = this.api.getCurrentUserID();

                    // Tạo mentions cho tất cả người (trừ bot)
                    let mentions = [];
                    let body = message;

                    participants.forEach((userID, index) => {
                        if (userID !== botID) {
                            mentions.push({
                                tag: "@",
                                id: userID,
                                fromIndex: 0,
                            });
                        }
                    });

                    const msgObject = {
                        body: body,
                        mentions: mentions.length > 0 ? mentions : undefined,
                    };

                    this.api.sendMessage(msgObject, threadID, (err) => {
                        if (err) {
                            logger(
                                `❌ Lỗi gửi tin nhắn tới ${threadID}: ${err.message}`,
                                "SCHEDULER",
                            );
                        }
                    });
                });
            } catch (error) {
                logger(
                    `❌ Exception khi gửi tin nhắn: ${error.message}`,
                    "SCHEDULER",
                );
            }
        });
    }
}

module.exports = Scheduler;
