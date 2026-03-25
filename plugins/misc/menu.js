// 🌺 Royal Glamour Menu for 𝕷𝖚𝖈𝖎𝖆-𝕸𝖉 🌺

const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { getSettings } = require('../../lib/database');
const { formatUptime } = require('../../lib/functions');

const MENU_IMAGES = [
"https://image2url.com/r2/default/images/1774048655796-11891a26-6498-4660-9295-2fa6c9ebace0.jpg",
"https://image2url.com/r2/default/images/1774048750311-4e7f00e2-c094-480e-a57c-9c7a2763f91c.jpg",
"https://image2url.com/r2/default/images/1774301093057-4b2dc779-b7f4-45a9-bd06-5c64999c51f4.jpg",
"https://image2url.com/r2/default/images/1774302034055-af740f50-9400-4dd3-a734-0d39b8c48348.jpg"
];

const AUDIO_FILES = [
path.join(__dirname, '../../audio/hola bb.mp3')
];

const menuCooldown = new Map();

module.exports = {
name: 'menu',
aliases: ['stella','queen'],
category: 'misc',
description: '𝐑𝐨𝐲𝐚𝐥 𝐆𝐥𝐚𝐦𝐨𝐮𝐫 𝐌𝐞𝐧𝐮',
usage: '.menu',

execute: async (client, message, args, msgOptions) => {

try {

const chatId = message.key.remoteJid;
const senderId = message.key.participant || message.key.remoteJid;

const commandKey = `${chatId}-${senderId}`;
const now = Date.now();

if (menuCooldown.get(commandKey) && now - menuCooldown.get(commandKey) < 3000) return;
menuCooldown.set(commandKey, now);

await client.sendMessage(chatId,{react:{text:"👑",key:message.key}});

const settings = getSettings();
const prefix = settings.prefix || config.prefix;

const images = settings.menuImages?.length > 0 ? settings.menuImages : MENU_IMAGES;
const randomImage = images[Math.floor(Math.random()*images.length)];

let caption = "```\n";

caption += `┏━━━━━━━━👑〔 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 〕👑━━━━━━━━✰\n`;
caption += `┃ 🌟 𝐎𝐰𝐧𝐞𝐫 : ༒𓊈𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘𓊉༒\n`;
caption += `┃ 👑 𝐔𝐬𝐞𝐫 : @${senderId.split('@')[0]}\n`;
caption += `┃ ❄️ 𝐏𝐫𝐞𝐟𝐢𝐱 : [${prefix}]\n`;
caption += `┃ 🌹 𝐔𝐩𝐭𝐢𝐦𝐞 : ${formatUptime(process.uptime())}\n`;
caption += `┗━━━━━━━━━━━━━━━━━━━━━━━━━✰\n\n`;

const categories = [

{dir:'system',title:'┏━━💎 𝐆𝐎𝐋𝐃 𝐑𝐄𝐀𝐋𝐌 💎'},
{dir:'media',title:'┏━━🌹 𝐌𝐄𝐃𝐈𝐀 𝐆𝐋𝐀𝐌 🌹'},
{dir:'group',title:'┏━━✨ 𝐆𝐑𝐎𝐔𝐏 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 ✨'},
{dir:'tools',title:'┏━━💖 𝐓𝐎𝐎𝐋𝐒 𝐎𝐅 𝐏𝐎𝐖𝐄𝐑 💖'},
{dir:'misc',title:'┏━━🌟 𝐌𝐈𝐒𝐂 𝐌𝐀𝐆𝐈𝐂 🌟'},
{dir:'fun',title:'┏━━💎 𝐅𝐔𝐍 𝐆𝐋𝐀𝐌 💎'},
{dir:'download',title:'┏━━👑 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐑𝐎𝐘𝐀𝐋 👑'},
{dir:'ai',title:'┏━━🌹 𝐀𝐈 𝐌𝐀𝐆𝐈𝐂 🌹'},
{dir:'owner',title:'┏━━💖 𝐊𝐈𝐍𝐆 𝐎𝐅 𝐂𝐎𝐃𝐄 💖'}

];

const pluginsDir = path.join(__dirname,'../../plugins');
const processed = new Set();

let totalCommands = 0;

for (const cat of categories){

const catPath = path.join(pluginsDir,cat.dir);

if(!fs.existsSync(catPath)) continue;

const files = fs.readdirSync(catPath).filter(f=>f.endsWith('.js'));

let cmds=[];

for (const file of files){

try{

const plugin = require(path.join(catPath,file));

const list = Array.isArray(plugin)?plugin:[plugin];

list.forEach(cmd=>{

if(cmd.name && !processed.has(cmd.name) && cmd.name!=='menu'){

processed.add(cmd.name);

cmds.push(cmd.name);

totalCommands++;

}

});

}catch{}

}

if(cmds.length>0){

caption += `${cat.title}\n`;

cmds.sort().forEach(c=>{

caption += `┃⚜️ /${c}\n`;

});

caption += `┗━━━━━━━━━━━━━━━━━━✰\n\n`;

}

}

caption += `┏━━━━━━━━━━━━━━━━━━━━━━━━━✰\n`;
caption += `┃ 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 - 𝐑𝐨𝐲𝐚𝐥 𝐒𝐲𝐬𝐭𝐞𝐦 🌺\n`;
caption += `┃ ⚜️ 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 : ${totalCommands}\n`;
caption += `┃ 👑 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘 𝐱 𝐃𝐚𝐫𝐤𝐦𝐨𝐝𝐬 𝐱 𝐍𝐞𝐦𝐞𝐬𝐢𝐬 𝐩𝐫𝐢𝐦𝐞 👑\n`;
caption += `┗━━━━━━━━━━━━━━━━━━━━━━━━━✰\n`;

caption += "```";

await client.sendMessage(chatId,{
image:{url:randomImage},
caption,
mentions:[senderId],
...msgOptions
},{quoted:message});

if (AUDIO_FILES.length > 0) {

setTimeout(() => {

const randomAudio = AUDIO_FILES[Math.floor(Math.random() * AUDIO_FILES.length)];

if (fs.existsSync(randomAudio)) {

const audioBuffer = fs.readFileSync(randomAudio);

client.sendMessage(chatId, {
audio: audioBuffer,
mimetype: 'audio/mpeg',
ptt: true
});

}

}, 800);

}

}catch(err){

console.log("Menu Error:",err);

}

}

};
