// 👑 Queen Lucia - Chatbot Control

const { updateSetting } = require('../../lib/database')
const { saveRequest, deleteRequest } = require('../../lib/store')
const { normalizeJid } = require('../../lib/authHelper')

module.exports = {

name:'chatbot',
aliases:['botauto'],
category:'owner',
description:'Configure chatbot auto reply',
usage:'.chatbot',
ownerOnly:true,

execute: async(client,message,args)=>{

const chatId = message.key.remoteJid

const menu = `👑 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 𝐂𝐡𝐚𝐭𝐛𝐨𝐭

Choose chatbot mode :

1️⃣ 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 𝐂𝐡𝐚𝐭
2️⃣ 𝐆𝐫𝐨𝐮𝐩 𝐂𝐡𝐚𝐭
3️⃣ 𝐁𝐨𝐭𝐡
4️⃣ 𝐎𝐟𝐟

Reply with a number.`

await client.sendMessage(chatId,{text:menu},{quoted:message})

const userId = message.key.fromMe
? normalizeJid(client.user?.id || "")
: normalizeJid(message.key.participant || chatId)

saveRequest(userId,chatId,{
command:'chatbot'
})

},

handleResponse: async(client,message,body,context)=>{

const choice = body.trim()
const chatId = message.key.remoteJid

if(!['1','2','3','4'].includes(choice)) return

let mode = 'off'
let responseText = ''

if(choice === '1'){
mode = 'private'
responseText = `🤖 𝐂𝐡𝐚𝐭𝐛𝐨𝐭 𝐞𝐧𝐚𝐛𝐥𝐞𝐝 𝐢𝐧 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐜𝐡𝐚𝐭`
}

else if(choice === '2'){
mode = 'group'
responseText = `🤖 𝐂𝐡𝐚𝐭𝐛𝐨𝐭 𝐞𝐧𝐚𝐛𝐥𝐞𝐝 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬`
}

else if(choice === '3'){
mode = 'both'
responseText = `🤖 𝐂𝐡𝐚𝐭𝐛𝐨𝐭 𝐞𝐧𝐚𝐛𝐥𝐞𝐝 𝐞𝐯𝐞𝐫𝐲𝐰𝐡𝐞𝐫𝐞`
}

else if(choice === '4'){
mode = 'off'
responseText = `❌ 𝐂𝐡𝐚𝐭𝐛𝐨𝐭 𝐝𝐢𝐬𝐚𝐛𝐥𝐞𝐝`
}

updateSetting('chatbotMode',mode)

await client.sendMessage(chatId,{text:responseText},{quoted:message})

const userId = message.key.fromMe
? normalizeJid(client.user?.id || "")
: normalizeJid(message.key.participant || chatId)

deleteRequest(userId,chatId)

}

}