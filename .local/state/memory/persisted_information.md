# Facebook Messenger Bot "Cyan" - Full Documentation

## 🎯 Project Overview
- **Name**: Cyan (Bot Messenger)
- **Language**: Vietnamese
- **Main Features**: Bad words filtering + scheduled messages
- **Status**: Running 24/7 with auto-recovery

## 📊 Current Features

### 1. Bad Words Filtering
- **Auto-detects** 20+ Vietnamese profanities
- **Deletes messages** containing bad words immediately
- **Replies with humorous alternatives** after deletion
- **2.5s cooldown** per thread to prevent spam
- Format includes cute emoji: `├─ ༺ 𝑲𝒊̣ 𝒆𝒎𝒐𝒋𝒊 ༻ ┤`

### 2. Scheduled Messages (NEW!)
Bot sends automatic messages at fixed times:

| Time | Content | Days |
|------|---------|------|
| 01:00 | Chúc ngủ ngon cho clan 😴✨ | Every day |
| 08:00 | Chúc buổi sáng tốt lành 🌅✨ | Every day |
| 12:00 | Chúc ăn trưa mạnh mõe 🍽️😋 | Every day |
| 20:00 | Chúc tối vui gia đình 🌙💕 | Every day |
| 19:55 | Gọi vào đua đội (có tag everyone) 🏆🔥 | Sat & Sun only |

All messages include cute emoji and Vietnamese text.

### 3. 24/7 Auto-Recovery
- Auto-restart on crash (5 seconds)
- Heartbeat check (every 30s)
- Connection recovery (max 5 retries)
- Keep-alive ping (every 5 min)

## 📂 Architecture

### Core Files
- `index.js` - Entry point, auto-restart logic
- `main.js` - Bot initialization, error handlers
- `modules/commands/badwords.js` - Bad word filtering logic
- `lib/scheduler.js` - Scheduled messages (NEW!)
- `lib/reconnect.js` - Connection recovery
- `config.json` - Bot configuration
- `appstate.json` - Facebook session

### Key Changes This Session
1. **modules/commands/badwords.js**
   - Added await/Promise logic for proper message deletion
   - Delay between deletion and reply (800ms)
   - Better error handling

2. **lib/scheduler.js** (NEW FILE)
   - Scheduler class using node-cron
   - 4 scheduled messages (8am, 12pm, 8pm, 7:55 Sat/Sun)
   - Sends to all active threads
   - Timezone: Asia/Ho_Chi_Minh

3. **includes/listen.js**
   - Import Scheduler class
   - Initialize scheduler with API
   - Update thread list and start scheduler after data load

4. **HUONG_DAN_SU_DUNG.md**
   - Added documentation for scheduler feature
   - Updated bad words example to show deletion
   - Added table of scheduled message times

## 🚀 How It Works

### Bad Words Flow
```
User sends message with profanity
    ↓
Bot detects word (regex match)
    ↓
Bot calls api.unsendMessage(messageID) with callback
    ↓
Wait 800ms (for Facebook to process)
    ↓
Bot sends suggestion message with emoji
```

### Scheduler Flow
```
Bot starts → Load all threads → Initialize Scheduler
    ↓
Scheduler creates 4 node-cron jobs:
  - 08:00 every day → sendToAllThreads()
  - 12:00 every day → sendToAllThreads()
  - 20:00 every day → sendToAllThreads()
  - 07:55 Sat/Sun → sendToAllThreads()
```

## ⏰ Scheduler Messages (Customizable)

### 8:00 AM - Morning Greeting
```
🌅✨ Chúc mọi người buổi sáng tốt lành...
(+ 8 decorated lines with emoji)
```

### 12:00 PM - Lunch Wish
```
🍽️😋 Chúc mọi người đi ăn trưa mạnh mõe...
(+ 8 decorated lines with emoji)
```

### 8:00 PM - Evening Greeting
```
🌙💕 Chúc mọi người tối nhiều niềm vui...
(+ 8 decorated lines with emoji)
```

### 7:55 AM (Sat/Sun) - Game Announcement
```
🏆🔥 CỒN 5 PHÚT NHÉ! Đua đội lúc 8h!
(+ 5 decorated lines with emoji)
```

## 🔐 Secrets & Environment
- `appstate.json` - Facebook AppState (KEEP SECRET!)
- Bot ID: 61558045955847
- Admin ID: 100088163078812
- Timezone: Asia/Ho_Chi_Minh

## 📝 Recent Changes (All Turns)
- **Turn 1-2**: Created badwords filter + 24/7 auto-recovery
- **Turn 3**: Fixed MODULE_NOT_FOUND errors, added error handlers
- **Turn 4**: Added scheduler for 4 timed messages
- **Turn 5**: Fixed message deletion timing issue
- **Turn 6**: Added scheduler system (NEW!)

## 👤 User Preferences
- Language: Vietnamese (vi)
- Features: Minimalist (badwords + scheduler only)
- Goal: 24/7 bot with personality
- Timezone: Vietnam (Asia/Ho_Chi_Minh)

## ⚠️ Important Notes
- AppState validity is critical for Facebook connection
- Scheduler uses node-cron (already installed)
- All scheduled messages go to ALL threads in allThreadID
- Messages have custom emoji and Vietnamese formatting
- Badword filtering deletes THEN replies (not simultaneous)
