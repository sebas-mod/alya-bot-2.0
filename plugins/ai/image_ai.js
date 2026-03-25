// 👑 Queen Lucia - AI Image Generator

const axios = require('axios')

const API_KEY = 'gifted'

const imageModels = [
{ name:'deepimg', endpoint:'deepimg', desc:'Generate image using DeepAI', format:'json_result' },
{ name:'flux', endpoint:'fluximg', desc:'Generate image using Flux', format:'json_result_url', extraParam:'&ratio=1:1' },
{ name:'sora', endpoint:'txt2img', desc:'Generate image using Sora', format:'json_result_url' },
{ name:'magicstudio', endpoint:'magicstudio', desc:'Generate image using MagicStudio', format:'buffer' }
]

const commands = imageModels.map(model => ({

name:model.name,
aliases:[],
category:'ai',
description:model.desc,
usage:`.${model.name} <prompt>`,

execute: async(client,message,args)=>{

const text = args.join(' ')

if(!text){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐩𝐫𝐨𝐦𝐩𝐭`
},{quoted:message})
}

await client.sendMessage(message.key.remoteJid,{
react:{text:"🎨",key:message.key}
})

try{

const url = `https://api.giftedtech.co.ke/api/ai/${model.endpoint}?apikey=${API_KEY}&prompt=${encodeURIComponent(text)}${model.extraParam || ''}`

let imageUrl

if(model.format === 'buffer'){

imageUrl = url

}else{

const { data } = await axios.get(url)

if(!data.success) throw new Error('API Error')

if(model.format === 'json_result'){
imageUrl = data.result
}

else if(model.format === 'json_result_url'){
imageUrl = data.result.url
}

}

if(!imageUrl) throw new Error('No image returned')

await client.sendMessage(message.key.remoteJid,{
image:{url:imageUrl},
caption:`🎨 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 𝐀𝐈

𝐌𝐨𝐝𝐞𝐥 : ${model.name.toUpperCase()}
𝐏𝐫𝐨𝐦𝐩𝐭 : ${text}`
},{quoted:message})

await client.sendMessage(message.key.remoteJid,{
react:{text:"✅",key:message.key}
})

}catch(error){

console.error(`Error ${model.name}:`,error)

await client.sendMessage(message.key.remoteJid,{
react:{text:"❌",key:message.key}
})

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐈𝐦𝐚𝐠𝐞 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐟𝐚𝐢𝐥𝐞𝐝`
},{quoted:message})

}

}

}))

module.exports = commands