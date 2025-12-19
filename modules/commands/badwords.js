module.exports.config = {
    name: "badwords",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Cyan",
    description: "Tự động trả lời và xoá tin nhắn khi phát hiện từ tục",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
};

const BAD_WORDS = {
    dmm: ["discord mom", "đừng mạnh mồm", "đá mông mày"],
    cmm: ["cool meme master", "chơi mạng mà", "cười mím môi"],
    đmm: ["discord mom", "đừng mạnh mồm", "đá mông mày"],
    dm: ["discord member", "đẹp mãi", "dễ mến"],
    đm: ["đẽp mãi", "dễ mến", "discord member"],
    cc: ["chú chó", "chào cậu", "cute cute"],
    vcl: ["very cool lắm", "việc chi lạ", "vui cười lên"],
    vl: ["very lovely", "vui lắm", "việc lạ"],
    clm: ["cute like me", "chơi là mệt", "cười lắm mày"],
    cl: ["cute lắm", "chơi lắm", "chill luôn"],
    đkm: ["đẹp không mà", "đỉnh kout mà", "đáng khen mà"],
    dkm: ["đẽp không mà", "đỉnh kout mà", "đáng khen mà"],
    wtf: ["wow thật fantastic", "what's the fun", "wow that's fun"],
    đcm: ["đẹp cực mà", "đỉnh cao mà", "discord community member"],
    dcm: ["đẽp cực mà", "đỉnh cao mà", "discord community member"],
    lol: ["lots of love", "laughing out loud"],
    đéo: ["đẽp ơi", "dễ ơi"],
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

    const cooldownKey = `${threadID}_badwords`;
    const now = Date.now();

    if (cooldowns.has(cooldownKey) && now - cooldowns.get(cooldownKey) < 2500) return;

    const text = body.toLowerCase().trim();

    for (const [badWord, responses] of Object.entries(BAD_WORDS)) {
        if (new RegExp(`(^|\\s|[.,!?])${badWord}(\\s|$|[.,!?])`, "i").test(text)) {
            const reply = responses[Math.floor(Math.random() * responses.length)];

            api.sendMessage(`౨ৎ 𝑮𝒐̛̣𝒊 𝒊́ 𝒕𝒖̛̀ 𝒏𝒈𝒖̛̃: ${reply}`, threadID, messageID);
            api.unsendMessage(messageID);

            cooldowns.set(cooldownKey, now);
            return;
        }
    }
};

module.exports.run = async function ({ api, event }) {
    api.sendMessage(
        "Module lọc từ tục + reply + auto xoá tin nhắn đã hoạt động!",
        event.threadID,
        event.messageID,
    );
};
