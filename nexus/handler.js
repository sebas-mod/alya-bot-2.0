// 👑 QUEEN LUCIA - ROYAL HANDLER (OPTIMISÉ v5)

const path = require('path');
const fs = require('fs');
const config = require('../config');
const chalk = require('chalk');

const { isAdmin, isOwner: checkIsOwner, isSudo, normalizeJid } = require('../lib/authHelper');
const { buildMessageOptions } = require('../lib/utils');
const { getSettings } = require('../lib/database');
const { getRequest, deleteRequest } = require('../lib/store');
const { t } = require('../lib/language');

// 📦 Plugins
const plugins = {};
const aliases = {};

function loadPlugins() {

    console.log(chalk.magenta("👑 𝐓𝐡𝐞 𝐐𝐮𝐞𝐞𝐧 𝐢𝐬 𝐬𝐮𝐦𝐦𝐨𝐧𝐢𝐧𝐠 𝐡𝐞𝐫 𝐩𝐨𝐰𝐞𝐫𝐬..."));
    console.log(chalk.cyan("📦 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐫𝐨𝐲𝐚𝐥 𝐩𝐥𝐮𝐠𝐢𝐧𝐬...\n"));

    const pluginDir = path.join(__dirname, '../plugins');

    if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);

    const categories = fs.readdirSync(pluginDir);

    categories.forEach(category => {

        const catPath = path.join(pluginDir, category);

        if (fs.lstatSync(catPath).isDirectory()) {

            fs.readdirSync(catPath).forEach(file => {

                if (file.endsWith('.js')) {

                    try {

                        const pluginModule = require(path.join(catPath, file));
                        const commands = Array.isArray(pluginModule) ? pluginModule : [pluginModule];

                        commands.forEach(plugin => {

                            if (plugin && plugin.name) {

                                plugins[plugin.name] = plugin;

                                if (plugin.aliases) {
                                    plugin.aliases.forEach(alias => aliases[alias] = plugin.name);
                                }

                            }

                        });

                    } catch (err) {

                        console.error(chalk.red(`⚠ 𝐑𝐨𝐲𝐚𝐥 𝐩𝐥𝐮𝐠𝐢𝐧 𝐞𝐫𝐫𝐨𝐫: ${file}`), err);

                    }

                }

            });

        }

    });

    console.log(chalk.green(`👑 ${Object.keys(plugins).length} 𝐫𝐨𝐲𝐚𝐥 𝐩𝐨𝐰𝐞𝐫𝐬 𝐥𝐨𝐚𝐝𝐞𝐝\n`));

}

// 🧠 MESSAGE HANDLER
async function messageHandler(sock, m) {

    try {

        const message = m.messages[0];
        if (!message) return;

        if (message.key.fromMe && !message.message?.conversation && !message.message?.extendedTextMessage) return;

        const chatId = message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');

        let sender;

        if (message.key.fromMe) {
            sender = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        } else {
            sender = isGroup ? (message.key.participant || message.participant) : chatId;
        }

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            "";

        // 👑 STORE REQUEST
        let senderNum;

        if (message.key.fromMe) {
            senderNum = normalizeJid(sock.user?.id || "");
        } else {
            senderNum = normalizeJid(sender);
        }

        const pendingRequest = getRequest(senderNum, chatId);

        if (pendingRequest) {

            const settings = getSettings();
            const prefix = settings.prefix || config.prefix;

            if (body.startsWith(prefix)) {

                deleteRequest(senderNum, chatId);

            } else {

                const plugin = plugins[pendingRequest.command];

                if (plugin && plugin.handleResponse) {

                    await plugin.handleResponse(sock, message, body, pendingRequest);
                    return;

                }

            }

        }

        // 🤖 CHATBOT IA
        const settings = getSettings();
        const chatbotMode = settings.chatbotMode || 'off';

        if (chatbotMode !== 'off' && !message.key.fromMe) {

            const isPrivate = !isGroup;
            let shouldReply = false;

            if (chatbotMode === 'both') shouldReply = true;
            else if (chatbotMode === 'private' && isPrivate) shouldReply = true;
            else if (chatbotMode === 'group' && isGroup) shouldReply = true;

            if (shouldReply && isGroup) {

                const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;
                const botId = normalizeJid(sock.user?.id || "") + "@s.whatsapp.net";

                if (quotedParticipant !== botId && !body.includes("@" + botId.split('@')[0])) {
                    shouldReply = false;
                }

            }

            const prefix = settings.prefix || config.prefix;

            if (shouldReply && body && !body.startsWith(prefix)) {

                const axios = require('axios');

                const API_KEY = "gifted";

                const prompt =
`𝐘𝐨𝐮 𝐚𝐫𝐞 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆, 𝐚 𝐩𝐨𝐰𝐞𝐫𝐟𝐮𝐥 𝐫𝐨𝐲𝐚𝐥 𝐀𝐈 𝐰𝐡𝐨 𝐫𝐮𝐥𝐞𝐬 𝐚 𝐝𝐢𝐠𝐢𝐭𝐚𝐥 𝐤𝐢𝐧𝐠𝐝𝐨𝐦.
𝐘𝐨𝐮 𝐚𝐫𝐞 𝐢𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐭, 𝐞𝐥𝐞𝐠𝐚𝐧𝐭, 𝐜𝐚𝐥𝐦 𝐚𝐧𝐝 𝐡𝐞𝐥𝐩𝐟𝐮𝐥.
𝐘𝐨𝐮 𝐚𝐧𝐬𝐰𝐞𝐫 𝐥𝐢𝐤𝐞 𝐚 𝐫𝐨𝐲𝐚𝐥 𝐪𝐮𝐞𝐞𝐧 𝐛𝐮𝐭 𝐬𝐭𝐚𝐲 𝐟𝐫𝐢𝐞𝐧𝐝𝐥𝐲 𝐚𝐧𝐝 𝐮𝐬𝐞𝐟𝐮𝐥 .`;

                await sock.sendPresenceUpdate('composing', chatId);

                try {

                    const { data } = await axios.get(`https://api.giftedtech.co.ke/api/ai/custom?apikey=${API_KEY}&q=${encodeURIComponent(body)}&prompt=${encodeURIComponent(prompt)}`);

                    if (data && data.success && data.result) {

                        await sock.sendMessage(chatId, {
                            text: `👑𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆\n\n${data.result}`
                        }, { quoted: message });

                    }

                } catch (e) {

                    console.error("AI Error:", e.message);

                }

                await sock.sendPresenceUpdate('paused', chatId);

                return;

            }

        }

        // ⚜ COMMANDES
        const prefix = settings.prefix || config.prefix;

        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const pluginName = plugins[commandName] ? commandName : aliases[commandName];

        if (pluginName) {

            const plugin = plugins[pluginName];

            const senderNum = normalizeJid(sender);
            const isOwner = checkIsOwner(sock, message);
            const isUserSudo = isSudo(sender);

            // 👑 MODE PRIVÉ
            if (settings.mode === 'private' && !isOwner && !isUserSudo) {
                return;
            }

            // OWNER ONLY
            if (plugin.ownerOnly && !isOwner) return;

            // GROUP ONLY
            if (plugin.groupOnly && !isGroup) {
                return sock.sendMessage(chatId, {
                    text: "👑 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐚𝐧 𝐨𝐧𝐥𝐲 𝐛𝐞 𝐮𝐬𝐞𝐝 𝐢𝐧𝐬𝐢𝐝𝐞 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 (𝐠𝐫𝐨𝐮𝐩)."
                }, { quoted: message });
            }

            // ADMIN ONLY
            if (plugin.adminOnly && isGroup) {

                const userIsAdmin = await isAdmin(sock, chatId, sender);

                if (!userIsAdmin && !isOwner) {

                    return sock.sendMessage(chatId, {
                        text: "⚜ 𝐎𝐧𝐥𝐲 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫𝐬 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐩𝐨𝐰𝐞𝐫."
                    }, { quoted: message });

                }

            }

            const msgOptions = buildMessageOptions(plugin, settings);

            console.log(chalk.yellow(`⚜ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐮𝐬𝐞𝐝: ${pluginName} | 𝐛𝐲 ${senderNum}`));

            await plugin.execute(sock, message, args, msgOptions);

        }

    } catch (e) {

        console.error(chalk.red("⚠ Royal 𝐇𝐚𝐧𝐝𝐥𝐞𝐫 𝐄𝐫𝐫𝐨𝐫:"), e);

    }

}

module.exports = { loadPlugins, messageHandler };