// 👑 Plugin: MODE — Queen Lucia Royal System

const { updateSetting } = require('../../lib/database');

module.exports = {
  name: 'mode',
  aliases: [],
  category: 'owner',
  description: '⚜ 𝐂𝐡𝐚𝐧𝐠𝐞 𝐭𝐡𝐞 𝐫𝐨𝐲𝐚𝐥 𝐦𝐨𝐝𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐛𝐨𝐭 (𝐩𝐮𝐛𝐥𝐢𝐜/𝐩𝐫𝐢𝐯𝐚𝐭𝐞)',
  usage: '.mode <public/private>',
  ownerOnly: true,

  execute: async (client, message, args) => {

    const chatId = message.key.remoteJid
    const newMode = args[0]?.toLowerCase()

    if (!['public','private'].includes(newMode)) {

      return client.sendMessage(chatId, {

text:
`╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚜ 𝐑𝐨𝐲𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐄𝐫𝐫𝐨𝐫
┃
┃ 𝐓𝐡𝐞 𝐐𝐮𝐞𝐞𝐧 𝐜𝐚𝐧𝐧𝐨𝐭
┃ 𝐮𝐧𝐝𝐞𝐫𝐬𝐭𝐚𝐧𝐝 𝐲𝐨𝐮𝐫 𝐨𝐫𝐝𝐞𝐫.
┃
┃ 𝐔𝐬𝐚𝐠𝐞 :
┃ .mode 𝐩𝐮𝐛𝐥𝐢𝐜
┃ .mode 𝐩𝐫𝐢𝐯𝐚𝐭𝐞
┃
┃ 👑 𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘 𝕹𝖊́𝖒𝖊́𝖘𝖎𝖘
╰━━━━━━━━━━━━━━━━━━╯`

      },{quoted:message})

    }

    // 👑 reaction
    await client.sendMessage(chatId,{
      react:{text:"👑",key:message.key}
    })

    // update mode
    updateSetting('mode',newMode)

    // royal message
    await client.sendMessage(chatId,{

text:
`╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚜ 𝐑𝐨𝐲𝐚𝐥 𝐃𝐞𝐜𝐫𝐞𝐞
┃
┃ 𝐓𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 𝐬𝐲𝐬𝐭𝐞𝐦
┃ 𝐦𝐨𝐝𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐜𝐡𝐚𝐧𝐠𝐞𝐝.
┃
┃ 🏰 𝐍𝐞𝐰 𝐌𝐨𝐝𝐞 : *${newMode.toUpperCase()}*
┃
┃ 👑 𝐎𝐫𝐝𝐞𝐫𝐞𝐝 𝐛𝐲 𝐭𝐡𝐞 𝐭𝐡𝐫𝐨𝐧𝐞
┃
┃ ⚡ 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲
┃     𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘 𝕹𝖊́𝖒𝖊́𝖘𝖎𝖘
╰━━━━━━━━━━━━━━━━━━╯`

    },{quoted:message})

  }
}