const fs = require("fs");

module.exports.config = {
    name: "badwords",
    version: "1.1.0",
    hasPermssion: 1,
    credits: "Bot",
    description: "Tự động trả lời và xoá tin nhắn khi phát hiện từ tục",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
};

const badWordsMap = {
    dmm: ["discord mom", "đừng mạnh mồm", "đá mông mày"],
    cmm: ["cool meme master", "chơi mạng mà", "cười mím môi"],
    đmm: ["discord mom", "đừng mạnh mồm", "đá mông mày"],
    dm: ["discord member", "đẹp mãi", "dễ mến"],
    đm: ["đẹp mãi", "dễ mến", "discord member"],
    cc: ["chú chó", "chào cậu", "cute cute"],
    vcl: ["very cool lắm", "việc chi lạ", "vui cười lên"],
    vl: ["very lovely", "vui lắm", "việc lạ"],
    clm: ["cute like me", "chơi là mệt", "cười lắm mày"],
    cl: ["cute lắm", "chơi lắm", "chill luôn"],
    đkm: ["đẹp không mà", "đỉnh kout mà", "đáng khen mà"],
    dkm: ["đẹp không mà", "đỉnh kout mà", "đáng khen mà"],
    wtf: ["wow thật fantastic", "what's the fun", "wow that's fun"],
    đcm: ["đẹp cực mà", "đỉnh cao mà", "discord community member"],
    dcm: ["đẹp cực mà", "đỉnh cao mà", "discord community member"],
    lol: ["lots of love", "laughing out loud"],
    đéo: ["đẹp ơi", "dễ ơi"],
    địt: ["đỉnh thật", "đỉnh lắm"],
    cặc: ["cái ách", "cạch mặt"],
    lồn: ["lớn rồi", "lỗi rồi"],
    buồi: ["buồn ơi", "bùi ngùi"],
    đụ: ["đủ rồi", "đừng"],
    vãi: ["vãi", "vậy"],
    mẹ: ["mệ ơi", "mê quá"],
};

const cooldowns = new Map();

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, body, senderID, messageID } = event;

    if (!body || senderID === api.getCurrentUserID()) return;

    const currentTime = Date.now();
    const cooldownKey = `${threadID}_badwords`;

    if (
        cooldowns.has(cooldownKey) &&
        currentTime - cooldowns.get(cooldownKey) < 2500
    )
        return;

    const lowerBody = body.toLowerCase().trim();

    for (const [badWord, responses] of Object.entries(badWordsMap)) {
        const regex = new RegExp(`(^|\\s|[.,!?])${badWord}(\\s|$|[.,!?])`, "i");
        if (regex.test(lowerBody)) {
            const randomResponse =
                responses[Math.floor(Math.random() * responses.length)];

            // 🔥 Reply đúng tin nhắn người gửi
            api.sendMessage(
                `౨ৎ 𝑮𝒐̛̣𝒊 𝒊́ 𝒕𝒖̛̀ 𝒏𝒈𝒖̛̃: ${randomResponse}`,
                threadID,
                messageID,
            );

            // ❌ Xoá tin nhắn tục của người dùng
            api.unsendMessage(messageID);

            cooldowns.set(cooldownKey, currentTime);
            return;
        }
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage(
        "Module lọc từ tục + reply + auto xoá tin nhắn đã hoạt động!",
        event.threadID,
        event.messageID,
    );
};
