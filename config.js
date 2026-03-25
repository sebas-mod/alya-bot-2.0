//// 🌺𝕷𝖚𝖈𝖎𝖆-𝕸𝖉🌺 - CONFIGURATION (Via .env)

require('dotenv').config();

module.exports = {

  // --- IDENTITÉ ---
  botName: process.env.BOT_NAME || '👑🌺 𝕼𝖚𝖊𝖊𝖓 𝕷𝖚𝖈𝖎𝖆 🌺👑',
  ownerName: process.env.OWNER_NAME || '༒𓊈𝕷𝖞𝖔𝖓 𝕶𝖎𝖓𝖌 𝕷𝖊́𝖔𝖓𝖎𝖉𝖆𝖘𓊉༒',

  // Multi Owner support
  ownerNumber: (process.env.OWNER_NUMBER || '5491138403093').split(','),

  // ⚠️ NE PAS FIXER LE NUMÉRO ICI
  phoneNumber: process.env.PHONE_NUMBER || '5491138403093',

  // --- PREFIX ---
  prefix: process.env.PREFIX || '.',

  // --- SESSION ---
  sessionName: process.env.SESSION_NAME || 'session',

  // --- LANGUE ---
  defaultLang: process.env.DEFAULT_LANG || 'fr',

  // --- BOT OPTIONS ---
  autoRead: process.env.AUTO_READ === 'true',

  // --- NEWSLETTER ---
  newsletterJid: process.env.NEWSLETTER_JID || '120363419277738229@newsletter',

  // --- LOGO ---
  logoUrl: process.env.LOGO_URL || 'https://image2url.com/r2/default/images/1774048864184-691faea7-b7dd-4844-8706-73a214ce232a.jpg',

  // --- PERFORMANCE ---
  syncFullHistory: false,
  keepAliveInterval: 30000,

  // --- DATABASE ---
  database: {
    users: './database/users.json',
    groups: './database/groups.json',
    settings: './database/settings.json'
  }

};
