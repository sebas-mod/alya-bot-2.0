// 👑 Queen Lucia - Media Storage

const fs = require('fs-extra');
const path = require('path');
const { downloadContentFromMessage } = require('gifted-baileys');
const { normalizeJid } = require('../../lib/authHelper');

const MEDIA_BASE_DIR = path.join(__dirname, '../../data/user_media');

const ensureDir = async (userId) => {
const cleanId = normalizeJid(userId);
const userDir = path.join(MEDIA_BASE_DIR, cleanId);
await fs.ensureDir(userDir);
return userDir;
};

module.exports = [

{
name:'store',
aliases:['save'],
category:'media',
description:'Save a media file',
usage:'.store <name>',
ownerOnly:true,

execute: async(client,message,args)=>{

const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

if(!quoted || (!quoted.audioMessage && !quoted.videoMessage)){
return client.sendMessage(message.key.remoteJid,{
text:`⚜️ 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 ⚜️

❌ 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐚𝐮𝐝𝐢𝐨 𝐨𝐫 𝐯𝐢𝐝𝐞𝐨`
});
}

const name = args[0];

if(!name){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐚𝐦𝐞`
});
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'💾',key:message.key}
});

const sender = message.key.fromMe
? client.user.id
: (message.key.participant || message.key.remoteJid);

const userDir = await ensureDir(sender);

const isVideo = !!quoted.videoMessage;
const ext = isVideo ? '.mp4' : '.mp3';

const filePath = path.join(userDir,name.toLowerCase()+ext);

const type = isVideo ? 'video' : 'audio';
const stream = await downloadContentFromMessage(quoted[type+'Message'],type);

let buffer = Buffer.from([]);

for await(const chunk of stream){
buffer = Buffer.concat([buffer,chunk]);
}

await fs.writeFile(filePath,buffer);

await client.sendMessage(message.key.remoteJid,{
text:`👑 𝐌𝐞𝐝𝐢𝐚 𝐬𝐚𝐯𝐞𝐝

${name}${ext}`
},{quoted:message});

}
},

{
name:'ad',
aliases:[],
category:'media',
description:'Play saved audio',
usage:'.ad <name>',
ownerOnly:true,

execute: async(client,message,args)=>{

const name = args[0];

if(!name)
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐚𝐦𝐞`
});

const sender = message.key.fromMe
? client.user.id
: (message.key.participant || message.key.remoteJid);

const userDir = await ensureDir(sender);
const mp3Path = path.join(userDir,name.toLowerCase()+'.mp3');

if(!fs.existsSync(mp3Path)){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐀𝐮𝐝𝐢𝐨 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
});
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'🎵',key:message.key}
});

const buffer = await fs.readFile(mp3Path);

await client.sendMessage(message.key.remoteJid,{
audio:buffer,
mimetype:'audio/mpeg',
ptt:false
},{quoted:message});

}
},

{
name:'vd',
aliases:['video'],
category:'media',
description:'Play saved video',
usage:'.vd <name>',
ownerOnly:true,

execute: async(client,message,args)=>{

const name = args[0];

if(!name)
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐚𝐦𝐞`
});

const sender = message.key.fromMe
? client.user.id
: (message.key.participant || message.key.remoteJid);

const userDir = await ensureDir(sender);
const mp4Path = path.join(userDir,name.toLowerCase()+'.mp4');

if(!fs.existsSync(mp4Path)){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐕𝐢𝐝𝐞𝐨 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
});
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'🎬',key:message.key}
});

const buffer = await fs.readFile(mp4Path);

await client.sendMessage(message.key.remoteJid,{
video:buffer,
caption:`👑 𝐕𝐢𝐝𝐞𝐨 : ${name}`,
gifPlayback:false
},{quoted:message});

}
},

{
name:'listmedia',
aliases:['medialist'],
category:'media',
description:'List saved media',
usage:'.listmedia',
ownerOnly:true,

execute: async(client,message)=>{

const sender = message.key.fromMe
? client.user.id
: (message.key.participant || message.key.remoteJid);

const userDir = await ensureDir(sender);

const files = await fs.readdir(userDir);

if(files.length === 0){
return client.sendMessage(message.key.remoteJid,{
text:`📂 𝐌𝐞𝐝𝐢𝐚 𝐥𝐢𝐬𝐭 𝐢𝐬 𝐞𝐦𝐩𝐭𝐲`
});
}

let text = `👑 𝐌𝐞𝐝𝐢𝐚 𝐋𝐢𝐬𝐭 (${files.length})\n\n`;

files.forEach((f,i)=>{
text += `${i+1}. ${f}\n`;
});

await client.sendMessage(message.key.remoteJid,{text},{quoted:message});

}
},

{
name:'delmedia',
aliases:['deletemedia'],
category:'media',
description:'Delete media',
usage:'.delmedia <name>',
ownerOnly:true,

execute: async(client,message,args)=>{

const name = args[0];

if(!name)
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐚𝐦𝐞`
});

const sender = message.key.fromMe
? client.user.id
: (message.key.participant || message.key.remoteJid);

const userDir = await ensureDir(sender);

let deleted = false;

try{
if(fs.existsSync(path.join(userDir,name+'.mp3'))){
await fs.unlink(path.join(userDir,name+'.mp3'));
deleted = true;
}
}catch{}

try{
if(fs.existsSync(path.join(userDir,name+'.mp4'))){
await fs.unlink(path.join(userDir,name+'.mp4'));
deleted = true;
}
}catch{}

if(deleted){
await client.sendMessage(message.key.remoteJid,{
text:`✅ 𝐌𝐞𝐝𝐢𝐚 𝐝𝐞𝐥𝐞𝐭𝐞𝐝 : ${name}`
},{quoted:message});
}else{
await client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐌𝐞𝐝𝐢𝐚 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
});
}

}

}

];