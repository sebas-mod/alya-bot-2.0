// 👑 Plugin: QUEEN GPT
// Royal AI conversation

const axios = require('axios');

module.exports = {
    name: 'gpt',
    aliases: ['ai', 'bot'],
    category: 'ai',
    description: '𝐒𝐩𝐞𝐚𝐤 𝐰𝐢𝐭𝐡  𝕷𝖚𝖈𝖎𝖆 𝐀𝐈',
    usage: '.gpt <question>',

    execute: async (client, message, args) => {

        const chatId = message.key.remoteJid;
        const text = args.join(' ');

        if (!text) {
            return client.sendMessage(chatId, {
                text:
`╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚜ 𝐑𝐨𝐲𝐚𝐥 𝐈𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞
┃
┃ 𝐀𝐬𝐤 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 𝐭𝐨
┃ 𝐭𝐡𝐞 𝐐𝐮𝐞𝐞𝐧'𝐬 𝐦𝐢𝐧𝐝.
┃
┃ 𝐄𝐱𝐚𝐦𝐩𝐥𝐞 :
┃ .gpt 𝐖𝐡𝐚𝐭 𝐢𝐬 𝐀𝐈 ?
╰━━━━━━━━━━━━━━━━━━╯`
            }, { quoted: message });
        }

        // 👑 Reaction
        await client.sendMessage(chatId, {
            react: { text: "👑", key: message.key }
        });

        // typing...
        await client.sendPresenceUpdate("composing", chatId);

        try {

            const { data } = await axios.get(
                `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(text)}`
            );

            const reply = data.reply || "𝐓𝐡𝐞 𝐐𝐮𝐞𝐞𝐧 𝐜𝐨𝐮𝐥𝐝 𝐧𝐨𝐭 𝐟𝐢𝐧𝐝 𝐚𝐧 𝐚𝐧𝐬𝐰𝐞𝐫.";

            await client.sendMessage(chatId, {

                text:
`╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚜ 𝐑𝐨𝐲𝐚𝐥 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞
┃
┃ ${reply}
┃
┃ ✨ 𝕷𝖚𝖈𝖎𝖆 𝖆𝖎 
╰━━━━━━━━━━━━━━━━━━╯`

            }, { quoted: message });

        } catch (error) {

            await client.sendMessage(chatId, {

                text:
`👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆

𝐓𝐡𝐞 𝐫𝐨𝐲𝐚𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐞𝐬 𝐚𝐫𝐞 𝐜𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐮𝐧𝐫𝐞𝐚𝐜𝐡𝐚𝐛𝐥𝐞.
𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.`

            }, { quoted: message });

        }

        await client.sendPresenceUpdate("paused", chatId);
    }
};