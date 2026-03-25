// 👑🌸𝕷𝖚𝖈𝖎𝖆-𝕸𝖉🌸👑 - POINT D'ENTRÉE

const { connectToWhatsApp } = require('./nexus/client');
const { loadPlugins } = require('./nexus/handler');
const config = require('./config');

async function start() {
    try {
        console.log(` ${config.botName} 𝖊𝖘𝖙 𝖊𝖓𝖙𝖗𝖆𝖎𝖓 𝖉𝖊 𝖉𝖊́𝖒𝖆𝖗𝖗𝖊𝖗🍷✨`);
        
        // 1. Charger les plugins
        loadPlugins();

        // 2. Se connecter
        await connectToWhatsApp();

    } catch (e) {
        console.error("Erreur critique:", e);
    }
}

start();