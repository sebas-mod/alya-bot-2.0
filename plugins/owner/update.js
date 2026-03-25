/// 👑 Queen Lucia - Update System

const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

module.exports = [

{
name: 'update',
aliases: ['up'],
category: 'owner',
description: '🔄 Update the bot from GitHub',
usage: '.update',
ownerOnly: true,

execute: async (client, message) => {

try {

// 🔐 Verificar owner (FORZADO - NO FALLA)
const isOwner = message.key.fromMe;

console.log('👑 UPDATE OWNER CHECK:', isOwner);

if (!isOwner) {
return client.sendMessage(message.key.remoteJid, {
text: '🚫 *Solo el Owner puede usar este comando.*'
}, { quoted: message })
}

// ⏳ Mensaje inicial
await client.sendMessage(message.key.remoteJid, {
text: '🌀 *Actualizando el repositorio...*\n⏳ Espera un momento...'
}, { quoted: message })

// 🚀 Ejecutar git pull
const { stdout, stderr } = await execPromise('git pull')

if (stderr) {
console.warn('⚠️ STDERR:', stderr)
}

let result = stdout?.trim() || '✅ Repositorio actualizado (sin cambios).'

console.log('📦 Resultado:\n', result)

// ✅ Mensaje final
await client.sendMessage(message.key.remoteJid, {
text: `✅ *Actualización completada:*\n\`\`\`${result}\`\`\`\n\n🔁 *Reiniciando bot...*`
}, { quoted: message })

// 🔄 Reinicio
setTimeout(() => {
process.exit(0)
}, 2000)

} catch (error) {

console.error('❌ Error update:', error)

await client.sendMessage(message.key.remoteJid, {
text: '🚨 *Error al actualizar:*\n```' + util.format(error) + '```'
}, { quoted: message })

}

}

}

]
