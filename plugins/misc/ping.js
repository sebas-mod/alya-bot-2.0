const os = require('os');

module.exports = {
  name: 'ping',
  aliases: [],
  category: 'misc',
  description: '𝐂𝐡𝐞𝐜𝐤 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 𝐬𝐭𝐚𝐭𝐮𝐬',
  usage: '.ping',

  execute: async (client, message, args, msgOptions) => {

    const start = Date.now();

    // React with crown
    await client.sendMessage(message.key.remoteJid, {
      react: { text: "👑", key: message.key }
    });

    // Initial royal message
    await client.sendMessage(message.key.remoteJid, {
      text: "👑 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 𝐢𝐬 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 𝐚𝐫𝐜𝐡𝐢𝐯𝐞𝐬 ..."
    }, { quoted: message });

    const end = Date.now();
    const latency = end - start;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor(uptime % 3600 / 60);
    const seconds = Math.floor(uptime % 60);

    // Royal ping embed
    await client.sendMessage(message.key.remoteJid, {
      image: { url: "https://image2url.com/r2/default/images/1774190096941-227d3ed8-166e-4fca-96db-0956a63647ad.jpg" },
      caption: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ♟ 𝐁𝐨𝐭 : 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆
┃ ⚡ 𝐏𝐢𝐧𝐠 : ${latency} ms
┃ ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${hours}h ${minutes}m ${seconds}s
┃ 📅 𝐃𝐚𝐭𝐞 : ${date}
┃ 🕒 𝐓𝐢𝐦𝐞 : ${time}
┃ 🏷 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : 1.0.0
┃
┃ 👑 𝐑𝐨𝐲𝐚𝐥 𝐃𝐞𝐜𝐫𝐞𝐞 :
┃ "𝐓𝐡𝐞 𝐝𝐢𝐠𝐢𝐭𝐚𝐥 𝐤𝐢𝐧𝐠𝐝𝐨𝐦
┃   𝐢𝐬 𝐨𝐩𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐩𝐞𝐫𝐟𝐞𝐜𝐭𝐥𝐲 ."
╰━━━━━━━━━━━━━━━━━━╯
`
    }, { quoted: message, ...msgOptions });

  }
};