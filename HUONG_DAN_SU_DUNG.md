# 📘 Hướng Dẫn Sử Dụng Bot Cyan

## 🎯 Giới Thiệu
Bot **Cyan** là một chatbot thông minh cho Facebook Messenger với tính năng lọc từ tục tự động.

---

## 🚀 Tính Năng Chính

### 1️⃣ Lọc Từ Tục Tự Động
**Chức năng:** Khi phát hiện người dùng nhắn từ tục, bot sẽ:
- ❌ Xóa tin nhắn chứa từ tục ngay lập tức
- 💬 Tự động gửi tin nhắn gợi ý thay thế

**Danh sách từ tục được lọc:**
- `dmm` → "discord mom", "đừng mạnh mồm", "đá mông mày"
- `cmm` → "cool meme master", "chơi mạng mà", "cười mím môi"
- `vcl` → "very cool lắm", "việc chi lạ", "vui cười lên"
- `vl` → "very lovely", "vui lắm", "việc lạ"
- `cc` → "chú chó", "chào cậu", "cute cute"
- Và nhiều từ khác...

**Ví dụ:**
```
User: "dmm quá"
→ [Tin nhắn bị xóa]
→ Bot gửi gợi ý:
├─ ༺ 𝑲𝒊̣ 𝒆𝒎𝒐𝒋𝒊 ༻ ┤
├─ 💭 𝑮𝒐̛̣𝒊 𝒊́ 𝒏𝒉𝒂̆𝒏:
├─ 💬 "discord mom"
╰─ ═══════════════════
```

### 2️⃣ Tin Nhắn Định Thời (Scheduler)
**Chức năng:** Bot tự động gửi tin nhắn vào các giờ cố định:

| Thời Gian | Nội Dung | Emoji |
|-----------|----------|-------|
| **8:00 sáng** | Chúc cả nhóm buổi sáng tốt lành | 🌅✨ |
| **12:00 trưa** | Chúc đi ăn trưa mạnh mõe | 🍽️😋 |
| **20:00 tối** | Chúc tối nhiều niềm vui gia đình | 🌙💕 |
| **7:55 (Thứ 7 & CN)** | Gọi mọi người vào đua đội nhé | 🏆🔥 |

**Ví dụ:**
```
Hàng ngày 8:00 sáng:
Bot gửi: 🌅✨ Chúc mọi người buổi sáng tốt lành...

Thứ 7 & Chủ nhật 7:55:
Bot gửi: 🏆🔥 CỒN 5 PHÚT NHÉ! Các bạn CBI vào đua đội nhé!
```

---

## ⚙️ Cài Đặt & Khởi Động

### Yêu cầu:
- Node.js 18+
- Facebook Account (để tạo AppState)

### Khởi động bot:
```bash
npm install
node index.js
```

### 🎯 Bot Chạy 24/7 Xuyên Đêm

Bot được cấu hình để hoạt động liên tục 24/7, kể cả khi tắt Facebook:

✅ **Auto-Restart:** Nếu bot bị crash, nó sẽ tự động khởi động lại trong 5 giây
✅ **Heartbeat Check:** Mỗi 30 giây bot kiểm tra kết nối, nếu bị ngắt sẽ tự động phục hồi
✅ **Connection Recovery:** Nếu mất kết nối, bot sẽ thử kết nối lại tối đa 5 lần
✅ **Keep-Alive:** Mỗi 5 phút bot gửi heartbeat để duy trì kết nối

**Cách hoạt động:**
```
Bot Chạy (index.js)
    ↓
Spawn main.js process
    ↓
Kết nối Facebook
    ↓
Bắt đầu nghe tin nhắn
    ↓
24/7 Monitoring (Heartbeat, Reconnect)
    ↓
Nếu crash → Tự động restart trong 5s
```

### Tệp cấu hình:
- `config.json` - Cấu hình chính (PREFIX, BOTNAME, ADMINBOT, etc.)

---

## 📋 Danh Sách Lệnh & Module

| Tên Module | Loại | Mô Tả |
|-----------|------|-------|
| badwords | Command | Lọc từ tục & tự động trả lời |
| *Các module khác* | * | Giữ chức năng cốt lõi |

---

## 🔧 Cách Chỉnh Sửa Từ Tục

**File:** `modules/commands/badwords.js`

```javascript
const BAD_WORDS = {
    "từ_mới": ["trả lời 1", "trả lời 2", "trả lời 3"],
    "dmm": ["discord mom", "đừng mạnh mồm", "đá mông mày"],
    // Thêm từ mới ở đây
};
```

**Bước:**
1. Mở file `modules/commands/badwords.js`
2. Thêm từ khóa vào object `BAD_WORDS`
3. Restart bot: `node index.js`

---

## ⏱️ Cooldown & Giới Hạn

| Tính Năng | Cooldown | Ghi Chú |
|----------|----------|--------|
| Badwords | 2.5 giây/nhóm | Tránh spam tin nhắn |

---

## 🎨 Tuỳ Chỉnh Thông Báo

**Chỉnh sửa tin nhắn reply badwords:**

Trong `modules/commands/badwords.js`, dòng 61:
```javascript
api.sendMessage(`127ৎ 𝑮𝒐̛̣𝒊 𝒊́ 𝒕𝒖̛̀ 𝒏𝒈𝒖̛̃: ${reply}`, threadID, messageID);
```

Thay đổi phần `127ৎ 𝑮𝒐̛̣𝒊...` thành nội dung của bạn.

---

## 🐛 Xử Lý Sự Cố

### Bot không xóa tin nhắn
- Đảm bảo bot có quyền admin trong nhóm
- Kiểm tra cú pháp trong `BAD_WORDS` object

### Bot không trả lời
- Restart bot: `node index.js`
- Kiểm tra file `utils/log.js` để xem lỗi

### Module không load
- Kiểm tra tên module có đúng không
- Xem logs bot để tìm lỗi

---

## 📞 Thông Tin Liên Hệ

- **Bot Name:** Cyan
- **Phiên bản:** 1.1.0
- **Trạng thái:** Active ✅

---

## 📝 Ghi Chú

- Bot hoạt động 24/7 khi được khởi động
- Tất cả tin nhắn được lọc theo keyword (không phân biệt hoa/thường)
- Cooldown 2.5 giây để tránh spam

---

**Cập nhật lần cuối:** 19/12/2025
