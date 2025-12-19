const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const express = require('express');
const path = require('path');
const chalk = require('chalkercli');
const chalk1 = require('chalk');
const CFonts = require('cfonts');
const app = express();
const port = process.env.PORT || 2006;
const moment = require("moment-timezone");
var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'




console.log('ㅤㅤㅤㅤ            𝐇𝐨̂𝐦 𝐧𝐚𝐲 𝐥𝐚̀:' +  thu,'𝐂𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐦𝐨̣̂𝐭 𝐧𝐠𝐚̀𝐲 𝐯𝐮𝐢 𝐯𝐞̉\n' )



app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '/index.html'));

});


app.listen(port);
console.log('𝐌𝐚́𝐲 𝐜𝐡𝐮̉ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐭𝐚̣𝐢 http://localhost:' + port,"𝐯𝐚̀𝐨 𝐥𝐮́𝐜:" + gio,"\n\n");


logger("𝐋𝐢𝐞̂𝐧 𝐡𝐞̣̂ 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/cyannohope", "𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤");


const rainbow = chalk.rainbow(`\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ『=== Cyan  ===』\n\n`).stop();
rainbow.render();
const frame = rainbow.frame(); 
console.log(frame);
logger("𝕐𝕠𝕦𝕣 𝕧𝕖𝕣𝕤𝕚𝕠𝕟 𝕚𝕤 𝕥𝕙𝕖 𝕝𝕒𝕥𝕖𝕤𝕥!", "UPDATE");


function startBot(message) {
    (message) ? logger(message, "BOT ĐANG KHỞI ĐỘNG") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

   child.on("close",async (codeExit) => {
        logger("Bot đã tắt với mã: " + codeExit, "BOT STATUS");
        // Tự động restart lại sau 5 giây nếu bot crash
        setTimeout(() => {
            startBot("🔄 BOT RESTART TỰ ĐỘNG - Duy trì hoạt động 24/7");
        }, 5000);
    });

    child.on("error", function (error) {
        logger("❌ Lỗi: " + JSON.stringify(error), "ERROR");
        // Retry lại khi có lỗi
        setTimeout(() => {
            startBot("🔄 BOT KHÔI PHỤC - Lỗi kết nối");
        }, 3000);
    });
    
    // Kiểm tra heartbeat - nếu process bị treo sẽ tự restart
    setInterval(() => {
        if (child.exitCode !== null) {
            logger("⚠️ Bot ngừng hoạt động, đang khôi phục...", "HEARTBEAT");
            startBot("🔄 HEARTBEAT RECOVERY");
        }
    }, 30000); // Check mỗi 30 giây
};
axios.get("https://raw.githubusercontent.com/tandung1/Bot12/main/package.json").then((res) => {
    //logger(res['data']['name'], "[ TÊN PR0JECT ]");
    //logger("Version: " + res['data']['version'], "[ PHIÊN BẢN ]");
    //logger(res['data']['description'], "[ LƯU Ý ]");
})
setTimeout(async function () {
//CFonts.say('Maris v3', {
    //font: 'block',
      //align: 'center',
  //gradient: ['red', 'magenta']
    //})
//CFonts.say(`Bot Messenger Created By Cyan`, {
    //font: 'console',
    //align: 'center',
    //gradient: ['red', 'magenta']
    //})
  //CFonts.say('Vtuan\n', {
    //font: 'block',
      //align: 'center',
  //gradient: ['red', 'magenta']
    //})

rainbow.render(); 

const frame = rainbow.frame(); 
console.log(frame);

  logger('𝐁𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐥𝐨𝐚𝐝 𝐬𝐨𝐮𝐫𝐜𝐞 𝐜𝐨𝐝𝐞', 'LOAD')
  startBot()
}, 70)