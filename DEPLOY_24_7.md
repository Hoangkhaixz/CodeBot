# 🚀 Hướng Dẫn Deploy Bot Cyan 24/7

## 📌 Vấn Đề Hiện Tại
Bot Cyan hiện tại chỉ chạy khi **project Replit đang bật**. Khi tắt Replit, bot sẽ dừng hoạt động.

## ✅ 2 Giải Pháp Deploy 24/7

---

## 1️⃣ CÁCH 1: Replit Reserved VM (Khuyên Dùng - Paid)

### Đặc Điểm:
✅ Bot chạy 24/7 trên Replit cloud  
✅ Không cần config bên ngoài  
✅ Tích hợp tốt với Replit  
❌ Có phí (khoảng $10-20/tháng)

### Cách Setup:

#### Bước 1: Chuẩn Bị Deployment Config
Trong Replit, tìm **"Publish"** button → Chọn **"Reserved VM"**

#### Bước 2: Configure Deployment
```
🎯 Deployment Type: Reserved VM
📦 Build command: npm install
🚀 Run command: npm start
💾 Primary Domain: (Replit sẽ tạo)
```

#### Bước 3: Kiểm Tra AppState
Đảm bảo `appstate.json` được lưu trong project (chứa session Facebook):
```bash
ls -la appstate.json
```

#### Bước 4: Deploy
- Nhấn **Publish** button trong Replit
- Chọn **Reserved VM** → Chọn machine power
- Hoàn tất deploy

### ✔️ Bot Sẽ Chạy 24/7
Sau deployment, bot sẽ:
- Chạy liên tục trên cloud
- Tự động restart nếu crash
- Hoạt động ngay cả khi bạn tắt Replit

---

## 2️⃣ CÁCH 2: UptimeRobot (Free Alternative - Giới Hạn)

### Đặc Điểm:
✅ Hoàn toàn miễn phí  
✅ Giữ app sống bằng ping định kỳ  
❌ Chỉ hoạt động khi Replit project còn có session hợp lệ  
❌ Không 100% đáng tin cậy cho production

### Cách Setup:

#### Bước 1: Kích Hoạt HTTP Server Trên Bot
Bot Cyan đã có Express server chạy trên port 2006. Kiểm tra:
```javascript
// index.js - line 32-40
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(port);
```

#### Bước 2: Lấy Public URL
Trong Replit:
- Nhấn **"Open in new tab"** → Copy URL
- Ví dụ: `https://cyan-bot-xxxxx.replit.dev`

#### Bước 3: Setup UptimeRobot
1. Đi tới https://uptimerobot.com (miễn phí)
2. Đăng ký account
3. Tạo **New Monitor**:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://cyan-bot-xxxxx.replit.dev`
   - **Monitoring Interval**: 5 phút
4. Lưu lại

#### Bước 4: UptimeRobot Sẽ Ping Bot
- Mỗi 5 phút, UptimeRobot sẽ gọi URL bot
- Giữ bot "sống" và hoạt động
- Nếu bot bị crash, UptimeRobot sẽ gửi alert

### ⚠️ Hạn Chế:
- Chỉ hoạt động khi project Replit có session valid
- Nếu AppState hết hạn, bot vẫn sẽ bị tắt
- Không đảm bảo 100% uptime

---

## 3️⃣ CÁCH 3: Deploy Bên Ngoài (Advanced)

### Dịch Vụ Có Thể Dùng:
- **Railway.app** - Free tier, Node.js support
- **Render** - Free tier, chạy 24/7
- **Heroku** - Paid, nhưng rất ổn định
- **AWS EC2** - Free tier 12 tháng

### Cách Migrate:
1. Clone code từ Replit lên local
2. Upload lên dịch vụ mới
3. Set environment variables (AppState, Config)
4. Deploy và monitor

---

## 🎯 KHUYẾN NGHỊ

### Nếu Bạn Muốn Bot Hoạt Động 100% 24/7:
**→ Dùng Replit Reserved VM (Cách 1)**
- Đơn giản, tích hợp tốt
- Có phí nhưng ổn định

### Nếu Bạn Muốn Miễn Phí:
**→ Dùng Replit + UptimeRobot (Cách 2)**
- Kết hợp Replit project (có session) + UptimeRobot (ping định kỳ)
- Hạn chế: cần giữ Replit project bật (hoặc bot sẽ mất session)

### Nếu Bạn Muốn Full Control:
**→ Deploy Lên Railway/Render (Cách 3)**
- Độc lập khỏi Replit
- Có thể control toàn bộ server

---

## 📋 Checklist Trước Khi Deploy

- [ ] `appstate.json` - Facebook session (valid)
- [ ] `config.json` - Bot configuration
- [ ] `package.json` - All dependencies
- [ ] `npm start` - Chạy bình thường locally
- [ ] Port 2006 - Được set đúng

---

## 🔧 Troubleshooting

**Q: Bot vẫn tắt sau khi deploy?**  
A: Kiểm tra AppState, có thể session Facebook hết hạn. Update lại AppState.

**Q: UptimeRobot ping nhưng bot vẫn không hoạt động?**  
A: Bot crash hoặc lỗi kết nối Facebook. Kiểm tra logs.

**Q: Mất deploy nên làm sao?**  
A: Dùng git để backup code, đỡ mất data.

---

## 📞 Hỗ Trợ
Nếu có vấn đề, hãy kiểm tra:
- Logs Replit
- `appstate.json` còn hợp lệ không
- Facebook profile có bị block không
- Network connection

---

**Bot Cyan sẽ sớm chạy 24/7 cho bạn! 🚀**
