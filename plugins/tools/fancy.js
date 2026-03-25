// ✨ Plugin: FANCY TEXT
// Royal style text formatter

const axios = require('axios');
const API_KEY = 'gifted';

module.exports = {
    name: 'fancy',
    aliases: ['font', 'style'],
    category: 'tools',
    description: 'Transform text into royal fancy styles',
    usage: '.fancy <text>',

    execute: async (client, message, args) => {

        const text = args.join(' ');
        
        if (!text) {
            return client.sendMessage(
                message.key.remoteJid,
                {
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐍𝐨 𝐫𝐨𝐲𝐚𝐥 𝐢𝐧𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐫𝐨𝐯𝐢𝐝𝐞𝐝.
𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐫𝐢𝐭𝐞 𝐭𝐡𝐞 𝐭𝐞𝐱𝐭 𝐲𝐨𝐮 𝐰𝐢𝐬𝐡 𝐭𝐨 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦 .`
                },
                { quoted: message }
            );
        }

        await client.sendMessage(message.key.remoteJid,{
            react:{ text:"✨", key:message.key }
        });

        try {

            const apiUrl = `https://api.giftedtech.co.ke/api/tools/fancy?apikey=${API_KEY}&text=${encodeURIComponent(text)}`;
            const { data } = await axios.get(apiUrl);

            if (!data.success || !data.results) throw new Error('API Fail');

            let replyText = `👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑

⚜️ 𝐑𝐨𝐲𝐚𝐥 𝐅𝐚𝐧𝐜𝐲 𝐒𝐭𝐲𝐥𝐞𝐬 ⚜️

`;

            data.results.forEach((item, index) => {
                replyText += `⚜️ ${index + 1}. ${item.result}\n`;
            });

            replyText += `

✨ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑳𝒚𝒐𝒏 ✨`;

            await client.sendMessage(
                message.key.remoteJid,
                { text: replyText },
                { quoted: message }
            );

        } catch (e) {

            console.error(e);

            client.sendMessage(
                message.key.remoteJid,
                {
text:`👑 🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺 👑
⚜️ 𝐓𝐡𝐞 𝐫𝐨𝐲𝐚𝐥 𝐬𝐜𝐫𝐢𝐛𝐞𝐬 𝐟𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐚𝐟𝐭 𝐭𝐡𝐞 𝐟𝐚𝐧𝐜𝐲 𝐭𝐞𝐱𝐭 .`
                },
                { quoted: message }
            );

        }
    }
};