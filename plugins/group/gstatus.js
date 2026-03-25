// 👑 Queen Lucia - Group Status

const { downloadContentFromMessage } = require('gifted-baileys');

module.exports = {
name: 'gstatus',
aliases: ['bg','broadcastgroup'],
category: 'group',
description: 'Send a status to the group',
usage: '.gstatus (reply to media/text)',

groupOnly: true,
adminOnly: true,

execute: async (client,message,args)=>{

const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const targetMessage = quoted || message.message;

if(!quoted && !args.length){
return client.sendMessage(message.key.remoteJid,{
text:`⚜️ 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 ⚜️

❌ 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚 𝐦𝐞𝐝𝐢𝐚 𝐨𝐫 𝐰𝐫𝐢𝐭𝐞 𝐚 𝐭𝐞𝐱𝐭`
});
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'⏳',key:message.key}
});

try{

const chatId = message.key.remoteJid;
let statusContent = {};

if(targetMessage.imageMessage){

const stream = await downloadContentFromMessage(targetMessage.imageMessage,'image');
let buffer = Buffer.from([]);

for await(const chunk of stream){
buffer = Buffer.concat([buffer,chunk]);
}

statusContent = {
image: buffer,
caption: targetMessage.imageMessage.caption || args.join(' ')
};

}

else if(targetMessage.videoMessage){

const stream = await downloadContentFromMessage(targetMessage.videoMessage,'video');
let buffer = Buffer.from([]);

for await(const chunk of stream){
buffer = Buffer.concat([buffer,chunk]);
}

statusContent = {
video: buffer,
caption: targetMessage.videoMessage.caption || args.join(' ')
};

}

else if(targetMessage.audioMessage){

const stream = await downloadContentFromMessage(targetMessage.audioMessage,'audio');
let buffer = Buffer.from([]);

for await(const chunk of stream){
buffer = Buffer.concat([buffer,chunk]);
}

statusContent = {
audio: buffer,
mimetype:'audio/mp4',
ptt:true
};

}

else{

const text = quoted ? (quoted.conversation || quoted.extendedTextMessage?.text) : args.join(' ');

statusContent = {
text:text,
backgroundColor:'#000000',
font:1
};

}

await client.sendMessage(chatId,{
groupStatusMessage: statusContent
});

await client.sendMessage(message.key.remoteJid,{
react:{text:'✅',key:message.key}
});

}catch(e){

console.error(e);

await client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐒𝐭𝐚𝐭𝐮𝐬 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐟𝐚𝐢𝐥𝐞𝐝`
});

}

}
};