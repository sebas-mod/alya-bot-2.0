// 🛠️ UTILS - FONCTIONS AVANCÉES (DYNAMIQUE)
// Gestion des ContextInfos, AdReply et Newsletter

const config = require('../config');

function getNewsletterContext(settings = {}) {
    return {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            // Priorité : DB > Config > Défaut
            newsletterJid: settings.newsletterJid || config.newsletterJid || '120363419277738229@newsletter',
            newsletterName: settings.botName || config.botName,
            serverMessageId: -1
        }
    };
}

function getAdReplyContext(settings = {}) {
    return {
        externalAdReply: {
            title: settings.botName || config.botName,
            body: "𝖇𝖞 𝕷𝖞𝖔𝖓 𝖐𝖎𝖓𝖌 𝖙𝖊𝖈𝖍",
            thumbnailUrl: config.logoUrl || 'https://image2url.com/r2/default/images/1774048750311-4e7f00e2-c094-480e-a57c-9c7a2763f91c.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vb75uTCDzgT9WKbHcw1t',
            mediaType: 1,
            mediaUrl: 'https://whatsapp.com/channel/0029Vb75uTCDzgT9WKbHcw1t',
            renderLargerThumbnail: true,
            showAdAttribution: true
        }
    };
}

function buildMessageOptions(command, settings = {}) {
    let contextInfo = {};

    if (command.newsletterShow) {
        Object.assign(contextInfo, getNewsletterContext(settings));
    }

    if (command.contextInfo) {
        Object.assign(contextInfo, getAdReplyContext(settings));
    }

    return Object.keys(contextInfo).length > 0 ? { contextInfo } : {};
}

// Extracteur robuste de média pour Baileys
function extractMedia(message) {
    if (!message) return null;
    
    const msg = message.message || message;
    const quoted = msg?.extendedTextMessage?.contextInfo?.quotedMessage;
    const target = quoted || msg;
    
    if (!target) return null;

    const mediaKeys = ['imageMessage', 'videoMessage', 'stickerMessage', 'audioMessage', 'documentMessage'];
    
    for (const key of Object.keys(target)) {
        if (mediaKeys.includes(key)) {
            return {
                type: key,
                message: target[key],
                mime: target[key]?.mimetype || ''
            };
        }
        if (key === 'viewOnceMessageV2' || key === 'viewOnceMessage') {
            const voMsg = target[key]?.message;
            if (voMsg) {
                for (const voKey of Object.keys(voMsg)) {
                    if (mediaKeys.includes(voKey)) {
                        return {
                            type: voKey,
                            message: voMsg[voKey],
                            mime: voMsg[voKey]?.mimetype || ''
                        };
                    }
                }
            }
        }
    }
    
    return null;
}

module.exports = {
    getNewsletterContext,
    getAdReplyContext,
    buildMessageOptions,
    extractMedia
};