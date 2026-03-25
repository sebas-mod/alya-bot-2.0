const { updateGroupSetting, getGroupSettings } = require('../../lib/database');

module.exports = {
  name: 'antilink',
  aliases: ['link'],
  category: 'group',
  description: 'Configure the royal ANTI-LINK protection',
  usage: '.antilink <on/off/action>',
  
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  execute: async (client, message, args) => {
    const chatId = message.key.remoteJid;
    const setting = args[0]?.toLowerCase();

    const currentConfig = getGroupSettings(chatId);

    // Show current status if no argument
    if (!setting) {
        return client.sendMessage(chatId, { 
            text: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ 🛡️ 𝐀𝐍𝐓𝐈-𝐋𝐈𝐍𝐊 : ${currentConfig.antilink ? '𝐎𝐍' : '𝐎𝐅𝐅'}
┃ ⚔️ *𝐀𝐂𝐓𝐈𝐎𝐍* : ${currentConfig.antilinkAction || 'none'}
╰━━━━━━━━━━━━━━━━━━╯
` 
        }, { quoted: message });
    }

    // Enable ANTI-LINK
    if (setting === 'on') {
        updateGroupSetting(chatId, 'antilink', true);
        return client.sendMessage(chatId, { 
            text: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ 🛡️ 𝐀𝐍𝐓𝐈-𝐋𝐈𝐍𝐊 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐭𝐮𝐫𝐧𝐞𝐝 𝐎𝐍
╰━━━━━━━━━━━━━━━━━━╯
` 
        }, { quoted: message });
    }

    // Disable ANTI-LINK
    if (setting === 'off') {
        updateGroupSetting(chatId, 'antilink', false);
        return client.sendMessage(chatId, { 
            text: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ 🛡️ 𝐀𝐍𝐓𝐈-𝐋𝐈𝐍𝐊 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐭𝐮𝐫𝐧𝐞𝐝 𝐎𝐅𝐅
╰━━━━━━━━━━━━━━━━━━╯
` 
        }, { quoted: message });
    }

    // Set action (kick or delete)
    if (['kick', 'delete'].includes(setting)) {
        updateGroupSetting(chatId, 'antilinkAction', setting);
        return client.sendMessage(chatId, { 
            text: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚔️ 𝐀𝐂𝐓𝐈𝐎𝐍 𝐢𝐬 𝐧𝐨𝐰 𝐬𝐞𝐭 𝐭𝐨: ${setting.toUpperCase()}
╰━━━━━━━━━━━━━━━━━━╯
` 
        }, { quoted: message });
    }

    // Invalid argument
    client.sendMessage(chatId, { 
        text: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚠️ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐚𝐠𝐞!
┃ 𝐔𝐬𝐞: .antilink <𝐨𝐧/𝐨𝐟𝐟/𝐤𝐢𝐜𝐤/𝐝𝐞𝐥𝐞𝐭𝐞>
╰━━━━━━━━━━━━━━━━━━╯
` 
    }, { quoted: message });
  }
};