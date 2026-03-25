/// 👑 Queen Lucia - Tag System (TagAll + HideTag with Image)

module.exports = [

{
name: 'tagall',
aliases: ['everyone'],
category: 'group',
description: '𝐒𝐮𝐦𝐦𝐨𝐧 𝐭𝐡𝐞 𝐞𝐧𝐭𝐢𝐫𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦',
usage: '.tagall <message>',
groupOnly: true,
adminOnly: true,

execute: async (client, message, args) => {

try {

const chatId = message.key.remoteJid

const metadata = await client.groupMetadata(chatId)
const participants = metadata.participants.map(p => p.id)
const groupName = metadata.subject

const msg = args.join(' ')

const imageUrl = "https://image2url.com/r2/default/images/1774301630200-be3cecd0-fdc7-4e02-8433-79265cab6ad6.jpg"

let list = ''
participants.forEach(user => {
list += `👑 @${user.split('@')[0]}\n`
})

const caption = `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ 🏰 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 : ${groupName}
┃ ⚜️ 𝐑𝐨𝐲𝐚𝐥 𝐃𝐞𝐜𝐫𝐞𝐞
┃
┃ 𝐓𝐡𝐞 𝐭𝐡𝐫𝐨𝐧𝐞 𝐬𝐮𝐦𝐦𝐨𝐧𝐬
┃ 𝐚𝐥𝐥 𝐬𝐮𝐛𝐣𝐞𝐜𝐭𝐬 𝐨𝐟 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦
┃
┃ 📜 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 :
┃ ${msg || "𝐇𝐞𝐫 𝐌𝐚𝐣𝐞𝐬𝐭𝐲 𝐝𝐞𝐦𝐚𝐧𝐝𝐬 𝐲𝐨𝐮𝐫 𝐚𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧"}
┃
┃ 👑 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 :
${list}
╰━━━━━━━━━━━━━━━━━━╯
`

await client.sendMessage(chatId, {

image: { url: imageUrl },
caption: caption,
mentions: participants

}, { quoted: message })

} catch (err) {

console.error("TagAll Error:", err)

client.sendMessage(message.key.remoteJid, {
text: "❌ 𝐓𝐚𝐠𝐀𝐥𝐥 failed."
})

}

}

},

{
name: 'hidetag',
aliases: ['ht'],
category: 'group',
description: '𝐒𝐞𝐜𝐫𝐞𝐭 𝐫𝐨𝐲𝐚𝐥 𝐬𝐮𝐦𝐦𝐨𝐧',
usage: '.hidetag <message>',
groupOnly: true,
adminOnly: true,

execute: async (client, message, args) => {

try {

const chatId = message.key.remoteJid

const metadata = await client.groupMetadata(chatId)
const participants = metadata.participants.map(p => p.id)
const groupName = metadata.subject

const msg = args.join(' ')

const imageUrl = "https://image2url.com/r2/default/images/1774301824165-68321d1b-7615-457f-b0bb-21b06036bddc.jpg"

const caption = msg || `
👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆

🏰 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 : ${groupName}

𝐀 𝐬𝐞𝐜𝐫𝐞𝐭 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐭𝐡𝐫𝐨𝐧𝐞
𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐥𝐢𝐯𝐞𝐫𝐞𝐝 𝐭𝐨 𝐚𝐥𝐥 𝐬𝐮𝐛𝐣𝐞𝐜𝐭𝐬.
`

await client.sendMessage(chatId, {

image: { url: imageUrl },
caption: caption,
mentions: participants

}, { quoted: message })

} catch (err) {

console.error("HideTag Error:", err)

client.sendMessage(message.key.remoteJid, {
text: "❌ 𝐇𝐢𝐝𝐞𝐓𝐚𝐠 failed."
})

}

}

}

]