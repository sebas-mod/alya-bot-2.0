const { updateGroupSetting, getGroupSettings } = require('../../lib/database');

module.exports = [
    {
        name: 'welcome',
        aliases: [],
        category: 'group',
        description: 'Enable/Disable the royal welcome message',
        usage: '.welcome <on/off>',
        
        groupOnly: true,
        adminOnly: true,

        execute: async (client, message, args) => {
            const chatId = message.key.remoteJid;
            const setting = args[0]?.toLowerCase();
            const groupConfig = getGroupSettings(chatId);

            // If no argument, show current status
            if (!setting) {
                return client.sendMessage(chatId, { text: `👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐢𝐬𝐬𝐮 𝐜𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲: ${groupConfig.welcome ? '𝐎𝐍' : '𝐎𝐅𝐅'}` }, { quoted: message });
            }

            // Enable welcome
            if (setting === 'on') {
                updateGroupSetting(chatId, 'welcome', true);
                
                const now = new Date();
                const date = now.toLocaleDateString();
                const time = now.toLocaleTimeString();
                const groupName = groupConfig.subject || "Unnamed Group";
                const groupDesc = groupConfig.desc || "No description available";

                const welcomeMessage = `
╭━━━〔 👑 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 〕━━━╮
┃ 🌺 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 𝐨𝐟: ${groupName}
┃ 🕒 𝐃𝐚𝐭𝐞: ${date} | 𝐓𝐢𝐦𝐞: ${time}
┃ 📝 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${groupDesc}
┃
┃ 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 𝐬𝐚𝐲𝐬:
┃ "𝐌𝐚𝐲 𝐲𝐨𝐮𝐫 𝐬𝐭𝐚𝐲 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐫𝐨𝐲𝐚𝐥 𝐫𝐞𝐚𝐥𝐦
┃   𝐛𝐞 𝐟𝐢𝐥𝐥𝐞𝐝 𝐰𝐢𝐭𝐡 𝐣𝐨𝐲 𝐚𝐧𝐝 𝐠𝐥𝐨𝐫𝐲 ."
╰━━━━━━━━━━━━━━━━━━╯
`;

                return client.sendMessage(chatId, { text: welcomeMessage }, { quoted: message });
            }

            // Disable welcome
            if (setting === 'off') {
                updateGroupSetting(chatId, 'welcome', false);
                return client.sendMessage(chatId, { text: `👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐭𝐮𝐫𝐧𝐞𝐝 𝐎𝐅𝐅 .` }, { quoted: message });
            }

            // Invalid argument
            return client.sendMessage(chatId, { text: '⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐩𝐞𝐜𝐢𝐟𝐲 "𝐨𝐧" 𝐨𝐫 "𝐨𝐟𝐟". 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: .welcome 𝐨𝐧' }, { quoted: message });
        }
    }
];