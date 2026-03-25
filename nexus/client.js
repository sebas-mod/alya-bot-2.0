//// 🌐 NEXUS - OPTIMIZED CONNECTION CLIENT
// Code inspired by SEN (direct connection + pairing)

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require('gifted-baileys');

const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Handler
const { messageHandler } = require('./handler');
const { monitorMessage, monitorGroupUpdate } = require('./monitor'); 
const { getSettings } = require('../lib/database');
const { styleText } = require('../lib/functions');

async function connectToWhatsApp() {

    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.cyan(`𝐥𝐚 𝐑𝐞𝐢𝐧𝐞 👑${config.botName}👑 𝐯𝐚 𝐟𝐚𝐢𝐫𝐞 𝐬𝐨𝐧 𝐞𝐧𝐭𝐫𝐞́𝐞 ...`));

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !config.pairingCode,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        keepAliveIntervalMs: 30000,
        defaultQueryTimeoutMs: 60000,
        retryRequestDelayMs: 250,
        getMessage: async () => undefined
    });

    // 🔗 PAIRING CODE
    if (!sock.authState.creds.registered) {

        setTimeout(async () => {

            let phoneNumber = config.phoneNumber?.replace(/[^0-9]/g, '');

            if (!phoneNumber) {
                console.log(chalk.red("❌ No pairing number defined in config.js"));
                return;
            }

            console.log(chalk.yellow(`⏳ Requesting pairing for : ${phoneNumber}`));

            try {

                let code = await sock.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;

                console.log(chalk.green(`\n✨👑 Use this royal code : ${code}\n`));

            } catch (e) {

                console.log(chalk.red("❌ Pairing error :", e.message));

            }

        }, 4000);
    }

    // 🔄 CONNECTION HANDLER
    sock.ev.on('connection.update', async (update) => {

        const { connection, lastDisconnect } = update;

        if (connection === 'close') {

            const statusCode = lastDisconnect.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            console.log(chalk.yellow(`Connection closed (Code: ${statusCode})`));

            if (statusCode === DisconnectReason.loggedOut) {

                console.log(chalk.red("Session invalid. Cleaning session."));

                try {
                    fs.rmSync(config.sessionName, { recursive: true, force: true });
                } catch {}

                process.exit(1);
            }

            if (shouldReconnect) {
                setTimeout(connectToWhatsApp, 3000);
            }

        } 
        
        else if (connection === 'open') {

            console.log(chalk.green('✅ Connected to WhatsApp !'));

            try {

                await sock.newsletterFollow("120363419277738229@newsletter");
                await sock.newsletterFollow("120363419277738229@newsletter");

            } catch {}

            const settings = getSettings();

            const botName = settings.botName || config.botName;
            const prefix = settings.prefix || config.prefix;

            let pluginCount = 0;

            const pluginDir = path.join(__dirname, '../plugins');

            if (fs.existsSync(pluginDir)) {

                fs.readdirSync(pluginDir).forEach(cat => {

                    const catPath = path.join(pluginDir, cat);

                    if (fs.lstatSync(catPath).isDirectory()) {

                        fs.readdirSync(catPath)
                        .filter(f => f.endsWith('.js'))
                        .forEach(file => {

                            try {

                                const plugin = require(path.join(catPath, file));

                                if (Array.isArray(plugin)) pluginCount += plugin.length;
                                else if (plugin.name) pluginCount++;

                            } catch {}

                        });
                    }

                });
            }

            // DATE & TIME
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            const versionBot = "1.0.0";

            const caption =
`╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ✨ ROYAL CONNECTION ✨
┃
┃ 🤖 Bot : ${botName}
┃ 👑 Owner : ${config.ownerName}
┃ ⚙ Prefix : ${prefix}
┃ 🧩 Plugins : ${pluginCount}
┃ 🏷 Version : ${versionBot}
┃
┃ 📅 Date : ${date}
┃ 🕒 Time : ${time}
┃
┃ 👑 The Queen has entered
┃ the digital kingdom.
┃
┃ ➤ ${styleText(`type ${prefix}menu to start your royal adventure 👑`)}
╰━━━━━━━━━━━━━━━━━━╯`;

            const images = settings.menuImages?.length
                ? settings.menuImages
                : ["https://image2url.com/r2/default/images/1774048864184-691faea7-b7dd-4844-8706-73a214ce232a.jpg"];

            const randomImage = images[Math.floor(Math.random() * images.length)];

            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';

            await sock.sendMessage(botJid, {

                image: { url: randomImage },
                caption: caption

            });
        }

    });

    sock.ev.on('creds.update', saveCreds);

    // 📩 MESSAGE HANDLER
    sock.ev.on('messages.upsert', async (m) => {

        const msg = m.messages[0];
        if (!msg) return;

        if (m.type === 'notify') {

            const chatId = msg.key.remoteJid;

            await monitorMessage(sock, m);
            await messageHandler(sock, m);

        }

    });

    // 👥 GROUP EVENTS
    sock.ev.on('group-participants.update', async (update) => {

        await monitorGroupUpdate(sock, update);

    });

    return sock;
}

module.exports = { connectToWhatsApp };