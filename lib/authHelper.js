// 🔐 AUTH HELPER (CommonJS)
// Gestion optimisée des permissions (Admin, Owner, Sudo)

const NodeCache = require('node-cache');
const chalk = require('chalk');
const config = require('../config');
const { getSettings } = require('./database'); // Import DB

// Cache pour éviter de spammer les requêtes de métadonnées de groupe
const groupMetadataCache = new NodeCache({
    stdTTL: 600, // 10 minutes
    checkperiod: 180,
    useClones: false
});

function normalizeJid(jid) {
    if (!jid) return "";
    // Supprime le suffixe :2, :3, etc. et garde le numéro propre avant @
    return jid.split(':')[0].split('@')[0];
}

// Récupération sécurisée des métadonnées (avec cache et gestion d'erreurs)
async function getGroupMetadataSafe(sock, chatId) {
    const cached = groupMetadataCache.get(chatId);
    if (cached) return cached;

    try {
        const metadata = await sock.groupMetadata(chatId);
        if (metadata) {
            groupMetadataCache.set(chatId, metadata);
        }
        return metadata;
    } catch (error) {
        const errCode = error?.output?.statusCode || 0;
        if (errCode === 428 || errCode === 429 || error.message?.includes('rate-overlimit')) {
            console.warn(chalk.yellow(`⚠️ Metadata ignoré pour ${chatId} (Rate Limit)`));
        }
        return null;
    }
}

// Vérifie si un utilisateur est Admin
async function isAdmin(sock, chatId, user) {
    if (!chatId.endsWith('@g.us')) return false;
    try {
        const metadata = await getGroupMetadataSafe(sock, chatId);
        if (!metadata || !metadata.participants) return false;
        
        const participant = metadata.participants.find(p => normalizeJid(p.id) === normalizeJid(user));
        return !!(participant && (participant.admin === 'admin' || participant.admin === 'superadmin'));
    } catch (error) {
        console.error("Erreur isAdmin:", error);
        return false;
    }
}

// Vérifie si c'est le Propriétaire (Owner)
function isOwner(sock, msg) {
    try {
        if (msg.key.fromMe) return true;

        const senderId = msg.key.participant || msg.participant || msg.key.remoteJid;
        if (!senderId) return false;

        const senderNumber = senderId.replace(/[^0-9]/g, '');

        const owners = config.ownerNumber.map(owner =>
            owner.trim().replace(/[^0-9]/g, '')
        );

        console.log('👑 OWNER CHECK:', senderNumber, owners);

        return owners.includes(senderNumber);

    } catch (e) {
        console.log('❌ isOwner error:', e);
        return false;
    }
}

// Vérifie si c'est un Sudo User
function isSudo(userJid) {
    try {
        const settings = getSettings();
        const sudos = settings.sudo || [];
        return sudos.includes(normalizeJid(userJid));
    } catch (e) {
        return false;
    }
}

module.exports = { 
    isAdmin,
    isOwner,
    isSudo,
    getGroupMetadataSafe,
    normalizeJid
};
