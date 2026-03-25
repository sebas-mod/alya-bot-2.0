// 💾 DATABASE HELPER (Extension Groupes)

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

function initDb() {
    if (!fs.existsSync(config.database.settings)) {
        fs.outputJsonSync(config.database.settings, { 
            mode: 'public', 
            lang: 'fr',
            autostatusview: false,
            autostatusreact: false,
            autotyping: false,
            autorecord: false,
            chatbotMode: 'off', // off, private, group, both
            sudo: [], // Liste des Super-Utilisateurs
            menuImages: [
                "https://image2url.com/r2/default/images/1774190227268-eae2898a-9ad7-429d-9a22-cd41940da9dc.jpg",
                "https://image2url.com/r2/default/images/1774190096941-227d3ed8-166e-4fca-96db-0956a63647ad.jpg",
                "https://image2url.com/r2/default/images/1774301093057-4b2dc779-b7f4-45a9-bd06-5c64999c51f4.jpg",
                "https://image2url.com/r2/default/images/1774302034055-af740f50-9400-4dd3-a734-0d39b8c48348.jpg"
            ]
        });
    }
    if (!fs.existsSync(config.database.groups)) fs.outputJsonSync(config.database.groups, {});
}

// Récupérer la config d'un groupe (avec valeurs par défaut)
function getGroupSettings(groupId) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    return groups[groupId] || {
        antilink: false,
        antilinkAction: 'delete',
        antispam: false,
        antitransfert: false,
        antimedia: false,
        antitag: false,
        antipromote: false,
        antidemote: false,
        antibadword: false,
        badwords: [],
        autoreact: false, // Réaction auto
        welcome: false, // Message de bienvenue
        welcomeMessage: `
╭━━━〔 👑 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 〕━━━╮
┃ ⚜️ Royal Welcome
┃
┃ 👤 Member : @user
┃ 🏰 Kingdom : @group
┃
┃ 📜 Group Description :
┃ @desc
┃
┃ 📅 Date : @date
┃ 🕒 Time : @time
┃
┃ 👑 The throne welcomes you
┃ to the royal kingdom.
╰━━━━━━━━━━━━━━━━━━╯
`
    };
}

// Mettre à jour un groupe
function updateGroupSetting(groupId, key, value) {
    initDb();
    const groups = fs.readJsonSync(config.database.groups);
    
    if (!groups[groupId]) groups[groupId] = {};
    groups[groupId][key] = value;
    
    fs.writeJsonSync(config.database.groups, groups, { spaces: 2 });
    return groups[groupId];
}

// ... (Le reste est identique : getSettings, updateSetting)
function getSettings() { initDb(); return fs.readJsonSync(config.database.settings); }
function updateSetting(key, value) { 
    const data = getSettings(); data[key] = value; 
    fs.writeJsonSync(config.database.settings, data, { spaces: 2 }); 
    return data; 
}

module.exports = { getSettings, updateSetting, getGroupSettings, updateGroupSetting };