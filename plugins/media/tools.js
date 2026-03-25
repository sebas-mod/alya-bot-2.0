/// 👑 Queen Lucia - Media Tools

const { downloadContentFromMessage } = require('gifted-baileys')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

module.exports = [
{
name:'toimg',
aliases:['img'],
category:'media',
description:'Convert sticker to image',
usage:'.toimg (reply to a sticker)',

execute: async(client,message,args)=>{

const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage

if(!quoted || !quoted.stickerMessage){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫`
})
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'🔄',key:message.key}
})

try{

const stream = await downloadContentFromMessage(quoted.stickerMessage,'sticker')

let buffer = Buffer.from([])

for await(const chunk of stream){
buffer = Buffer.concat([buffer,chunk])
}

const inputPath = path.join(__dirname,`../../temp/${Math.floor(Math.random()*10000)}.webp`)
const outputPath = path.join(__dirname,`../../temp/${Math.floor(Math.random()*10000)}.png`)

fs.writeFileSync(inputPath,buffer)

exec(`ffmpeg -i "${inputPath}" "${outputPath}"`,async(err)=>{

fs.unlinkSync(inputPath)

if(err){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐂𝐨𝐧𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐟𝐚𝐢𝐥𝐞𝐝`
})
}

await client.sendMessage(message.key.remoteJid,{
image:{url:outputPath},
caption:`👑 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐝`
},{quoted:message})

fs.unlinkSync(outputPath)

})

}catch(e){

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐂𝐨𝐧𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐞𝐫𝐫𝐨𝐫`
})

}

}
}
]