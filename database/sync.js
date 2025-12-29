const { sequelize, Sequelize } = require("./connect");
const fs = require("fs");
const path = require("path");
const modelsPath = path.join(__dirname,"../models");
const models = {};

fs.readdirSync(modelsPath).forEach(f=>{
 if(f.endsWith(".js")){
  const def=require(path.join(modelsPath,f));
  const m=def({sequelize,Sequelize});
  models[m.name]=m;
  console.log("📌 Loaded:",m.name);
 }});

(async()=>{
 try{
  await sequelize.sync({alter:true});
  console.log("✅ DB synced");
 }catch(e){console.error("❌",e.message);}
})();

module.exports = models;