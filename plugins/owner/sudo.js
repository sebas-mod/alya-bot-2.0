const { updateSetting, getSettings } = require('../../lib/database');
const { normalizeJid } = require('../../lib/authHelper');

module.exports = [
{
name: 'setsudo',
aliases: ['addsudo'],
category: 'owner',
description: 'Add a royal knight',
usage: '.setsudo (@tag or reply)',
ownerOnly: true,

execute: async (client, message, args) => {

const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.participant || message.message?.extendedTextMessage?.contextInfo?.participant;
const target = mentioned || quoted;

if (!target) {
return client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐍𝐨 𝐫𝐨𝐲𝐚𝐥 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐬𝐢𝐠𝐧𝐚𝐭𝐞𝐝.
𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐨𝐫 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐩𝐞𝐫𝐬𝐨𝐧 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 to 𝐞𝐥𝐞𝐯𝐚𝐭𝐞 𝐭𝐨 𝐫𝐨𝐲𝐚𝐥 𝐫𝐚𝐧𝐤 .`
},{quoted:message});
}

const targetId = normalizeJid(target);
const settings = getSettings();
let sudos = settings.sudo || [];

if (sudos.includes(targetId)) {
return client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐓𝐡𝐢𝐬 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐩𝐨𝐬𝐬𝐞𝐬𝐬𝐞𝐬 𝐫𝐨𝐲𝐚𝐥 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐞𝐬 .`
},{quoted:message});
}

sudos.push(targetId);
updateSetting('sudo', sudos);

await client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐁𝐲 𝐦𝐲 𝐫𝐨𝐲𝐚𝐥 𝐝𝐞𝐜𝐫𝐞𝐞, @${targetId} 𝐢𝐬 𝐧𝐨𝐰 𝐚 𝐊𝐧𝐢𝐠𝐡𝐭 𝐨𝐟 𝐭𝐡𝐞 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 .`,
mentions:[target]
},{quoted:message});

}
},

{
name: 'delsudo',
aliases: ['rmsudo'],
category: 'owner',
description: 'Remove a royal knight',
usage: '.delsudo (@tag or reply)',
ownerOnly: true,

execute: async (client, message, args) => {

const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.participant;
const target = mentioned || quoted;

if (!target) {
return client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐍𝐨 𝐫𝐨𝐲𝐚𝐥 𝐤𝐧𝐢𝐠𝐡𝐭 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐬𝐢𝐠𝐧𝐚𝐭𝐞𝐝 .`
},{quoted:message});
}

const targetId = normalizeJid(target);
const settings = getSettings();
let sudos = settings.sudo || [];

if (!sudos.includes(targetId)) {
return client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐓𝐡𝐢𝐬 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐡𝐚𝐬 𝐧𝐨 𝐫𝐨𝐲𝐚𝐥 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐞𝐬 .`
},{quoted:message});
}

sudos = sudos.filter(id => id !== targetId);
updateSetting('sudo', sudos);

await client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐁𝐲 𝐨𝐫𝐝𝐞𝐫 𝐨𝐟 𝐭𝐡𝐞 𝐐𝐮𝐞𝐞𝐧, @${targetId} 𝐥𝐨𝐬𝐞𝐬 𝐭𝐡𝐞𝐢𝐫 𝐫𝐨𝐲𝐚𝐥 privileges.`,
mentions:[target]
},{quoted:message});

}
},

{
name: 'listsudo',
aliases: ['sudos'],
category: 'owner',
description: 'List of royal knights',
usage: '.listsudo',
ownerOnly: true,

execute: async (client, message, args) => {

const settings = getSettings();
const sudos = settings.sudo || [];

if (sudos.length === 0) {
return client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐍𝐨 𝐤𝐧𝐢𝐠𝐡𝐭 𝐡𝐚𝐬 𝐲𝐞𝐭 𝐛𝐞𝐞𝐧 𝐜𝐡𝐨𝐬𝐞𝐧 𝐭𝐨 𝐬𝐞𝐫𝐯𝐞 𝐭𝐡𝐞 𝐜𝐫𝐨𝐰𝐧 .`
},{quoted:message});
}

let list='';
sudos.forEach(s => list+=`⚜️ @${s}\n`);

await client.sendMessage(message.key.remoteJid,{
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑

⚜️ 𝐊𝐧𝐢𝐠𝐡𝐭𝐬 𝐨𝐟 𝐭𝐡𝐞 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 ⚜️

${list}

✨ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝐛𝐲 𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘 ✨`,
mentions:sudos.map(s=>s+'@s.whatsapp.net')
},{quoted:message});

}
}
];