//// 👑 Queen Lucia - Anime Plugin
// API: GiftedTech

const axios = require('axios')
const API_KEY = 'gifted'

module.exports = [

{
name:'loli',
aliases:[],
category:'anime',
description:'Random Loli image',
usage:'.loli',

execute: async(client,message)=>{

try{

await client.sendMessage(message.key.remoteJid,{
react:{text:'🌸',key:message.key}
})

const imageUrl = `https://api.giftedtech.co.ke/api/anime/loli?apikey=${API_KEY}`

await client.sendMessage(message.key.remoteJid,{
image:{url:imageUrl},
caption:`🌸 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 𝐀𝐧𝐢𝐦𝐞

𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : LOLI`
},{quoted:message})

}catch(error){

console.error("Loli Error:",error.message)

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐈𝐦𝐚𝐠𝐞 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

}

}
},

{
name:'awoo',
aliases:[],
category:'anime',
description:'Random Awoo image',
usage:'.awoo',

execute: async(client,message)=>{

try{

await client.sendMessage(message.key.remoteJid,{
react:{text:'🐺',key:message.key}
})

const {data} = await axios.get(`https://api.giftedtech.co.ke/api/anime/awoo?apikey=${API_KEY}`)

if(!data.success || !data.result) throw new Error('API Error')

await client.sendMessage(message.key.remoteJid,{
image:{url:data.result},
caption:`🐺 𝐀𝐰𝐨𝐨 𝐀𝐧𝐢𝐦𝐞`
},{quoted:message})

}catch(error){

console.error("Awoo Error:",error.message)

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐈𝐦𝐚𝐠𝐞 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

}

}
},

{
name:'animequote',
aliases:['quote','quotes'],
category:'anime',
description:'Random anime quote',
usage:'.animequote',

execute: async(client,message)=>{

try{

await client.sendMessage(message.key.remoteJid,{
react:{text:'💬',key:message.key}
})

const {data} = await axios.get(`https://api.giftedtech.co.ke/api/anime/quotes?apikey=${API_KEY}`)

if(!data.success || !data.result) throw new Error('API Error')

const {character,show,quote} = data.result

const text = `💬 𝐀𝐧𝐢𝐦𝐞 𝐐𝐮𝐨𝐭𝐞

"${quote}"

— ${character}
(${show})`

await client.sendMessage(message.key.remoteJid,{text},{quoted:message})

}catch(error){

console.error("Quote Error:",error.message)

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐐𝐮𝐨𝐭𝐞 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

}

}
},

{
name:'kusonime',
aliases:['kuso'],
category:'anime',
description:'Search or latest Kusonime anime',
usage:'.kusonime [search]',

execute: async(client,message,args)=>{

try{

await client.sendMessage(message.key.remoteJid,{
react:{text:'📺',key:message.key}
})

const query = args.join(' ')

let apiUrl = `https://api.giftedtech.co.ke/api/anime/kusonime-info?apikey=${API_KEY}`

if(query){
apiUrl = `https://api.giftedtech.co.ke/api/anime/kusonime-search?apikey=${API_KEY}&query=${encodeURIComponent(query)}`
}

const {data} = await axios.get(apiUrl)

if(!data.success || !data.result || data.result.length === 0) throw new Error('API Error')

const animes = data.result.slice(0,3)

for(const anime of animes){

let caption = `📺 𝐊𝐮𝐬𝐨𝐧𝐢𝐦𝐞 ${query ? 'Search' : 'Latest'}

𝐓𝐢𝐭𝐥𝐞 : ${anime.title}
🎭 𝐆𝐞𝐧𝐫𝐞𝐬 : ${anime.genres.join(', ')}
🕒 𝐑𝐞𝐥𝐞𝐚𝐬𝐞 : ${anime.releaseTime}

🔗 ${anime.url}`

await client.sendMessage(message.key.remoteJid,{
image:{url:anime.thumbnail},
caption
},{quoted:message})

}

}catch(error){

console.error("Kusonime Error:",error.message)

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐀𝐧𝐢𝐦𝐞 𝐢𝐧𝐟𝐨 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

}

}
},

{
name:'komiku',
aliases:['manga','komik'],
category:'anime',
description:'Search manga from Komiku',
usage:'.komiku <search>',

execute: async(client,message,args)=>{

try{

const query = args.join(' ')

if(!query){
return client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐬𝐞𝐚𝐫𝐜𝐡`
},{quoted:message})
}

await client.sendMessage(message.key.remoteJid,{
react:{text:'📚',key:message.key}
})

const apiUrl = `https://api.giftedtech.co.ke/api/anime/komiku?apikey=${API_KEY}&query=${encodeURIComponent(query)}&type=manga`

const {data} = await axios.get(apiUrl)

if(!data.success || !data.result || data.result.length === 0) throw new Error('API Error')

const mangas = data.result.slice(0,3)

for(const manga of mangas){

let caption = `📚 𝐊𝐨𝐦𝐢𝐤𝐮 𝐒𝐞𝐚𝐫𝐜𝐡

𝐓𝐢𝐭𝐥𝐞 : ${manga.title}
𝐆𝐞𝐧𝐫𝐞 : ${manga.genre}

${manga.description}

🔗 ${manga.url}`

await client.sendMessage(message.key.remoteJid,{
image:{url:manga.img},
caption
},{quoted:message})

}

}catch(error){

console.error("Komiku Error:",error.message)

client.sendMessage(message.key.remoteJid,{
text:`❌ 𝐌𝐚𝐧𝐠𝐚 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
},{quoted:message})

}

}
}

]