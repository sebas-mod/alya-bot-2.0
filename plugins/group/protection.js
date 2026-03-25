// 👑 Queen Lucia - Group Protections

const { updateGroupSetting, getGroupSettings } = require('../../lib/database');

const PROTECTIONS = [
{ cmd:'antispam', name:'𝐀𝐍𝐓𝐈𝐒𝐏𝐀𝐌', desc:'Spam protection' },
{ cmd:'antimedia', name:'𝐀𝐍𝐓𝐈𝐌𝐄𝐃𝐈𝐀', desc:'Block images and videos' },
{ cmd:'antitag', name:'𝐀𝐍𝐓𝐈𝐓𝐀𝐆', desc:'Block excessive mentions' },
{ cmd:'antipromote', name:'𝐀𝐍𝐓𝐈-𝐏𝐑𝐎𝐌𝐎𝐓𝐄', desc:'Block unauthorized promotions' },
{ cmd:'antidemote', name:'𝐀𝐍𝐓𝐈-𝐃𝐄𝐌𝐎𝐓𝐄', desc:'Prevent demotions' },
{ cmd:'antitransfert', name:'𝐀𝐍𝐓𝐈-𝐅𝐎𝐑𝐖𝐀𝐑𝐃', desc:'Block forwarded messages' },
{ cmd:'antibadword', name:'𝐀𝐍𝐓𝐈-𝐁𝐀𝐃𝐖𝐎𝐑𝐃', desc:'Filter bad words' }
];

const commands = PROTECTIONS.map(prot => ({

name: prot.cmd,
aliases: [],
category: 'group',
description: prot.desc,
usage: `.${prot.cmd} <on/off>`,

groupOnly: true,
adminOnly: true,

execute: async (client,message,args)=>{

const chatId = message.key.remoteJid
const setting = args[0]?.toLowerCase()

const config = getGroupSettings(chatId)

if(!setting){

return client.sendMessage(chatId,{
text:`⚜️ 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 ⚜️

👑 ${prot.name}

𝐒𝐭𝐚𝐭𝐮𝐬 : ${config[prot.cmd] ? '𝐎𝐍' : '𝐎𝐅𝐅'}`
},{quoted:message})

}

if(setting === 'on'){

updateGroupSetting(chatId,prot.cmd,true)

return client.sendMessage(chatId,{
text:`👑 ${prot.name}

✅ 𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐞𝐧𝐚𝐛𝐥𝐞𝐝`
},{quoted:message})

}

if(setting === 'off'){

updateGroupSetting(chatId,prot.cmd,false)

return client.sendMessage(chatId,{
text:`⚜️ ${prot.name}

❌ 𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐢𝐬𝐚𝐛𝐥𝐞𝐝`
},{quoted:message})

}

client.sendMessage(chatId,{
text:`❌ 𝐔𝐬𝐚𝐠𝐞

.${prot.cmd} on
.${prot.cmd} off`
},{quoted:message})

}

}))

// BADWORD SYSTEM

const setBadword = {

name:'setbadword',
aliases:['addbadword','delbadword'],
category:'group',
description:'Manage bad words list',
usage:'.setbadword <add/del/list> <word>',

groupOnly:true,
adminOnly:true,

execute: async(client,message,args)=>{

const chatId = message.key.remoteJid
const action = args[0]?.toLowerCase()
const word = args.slice(1).join(' ')

let config = getGroupSettings(chatId)
let badwords = config.badwords || []

if(action === 'add' && word){

if(badwords.includes(word))
return client.sendMessage(chatId,{
text:`❌ 𝐖𝐨𝐫𝐝 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐞𝐱𝐢𝐬𝐭𝐬`
},{quoted:message})

badwords.push(word)

updateGroupSetting(chatId,'badwords',badwords)

return client.sendMessage(chatId,{
text:`✅ 𝐖𝐨𝐫𝐝 𝐚𝐝𝐝𝐞𝐝

👑 ${word}`
},{quoted:message})

}

if(action === 'del' && word){

if(!badwords.includes(word))
return client.sendMessage(chatId,{
text:`❌ 𝐖𝐨𝐫𝐝 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

badwords = badwords.filter(w=>w!==word)

updateGroupSetting(chatId,'badwords',badwords)

return client.sendMessage(chatId,{
text:`⚜️ 𝐖𝐨𝐫𝐝 𝐫𝐞𝐦𝐨𝐯𝐞𝐝

👑 ${word}`
},{quoted:message})

}

if(action === 'list'){

return client.sendMessage(chatId,{
text:`👑 𝐁𝐚𝐝 𝐖𝐨𝐫𝐝𝐬 𝐋𝐢𝐬𝐭

${badwords.join(', ') || 'None'}`
},{quoted:message})

}

client.sendMessage(chatId,{
text:`❌ 𝐔𝐬𝐚𝐠𝐞

.setbadword add word
.setbadword del word
.setbadword list`
},{quoted:message})

}

}

module.exports = [...commands,setBadword]