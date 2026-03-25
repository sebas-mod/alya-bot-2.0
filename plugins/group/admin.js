// 👑 Queen Lucia - Group Control

function getTarget(message) {
return message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
message.message?.extendedTextMessage?.contextInfo?.participant ||
message.message?.extendedTextMessage?.contextInfo?.quotedParticipant ||
null;
}

module.exports = [

{
name: 'kick',
aliases: ['remove','ban'],
category: 'group',
description: 'Remove a member',
groupOnly: true,
adminOnly: true,

execute: async (client,message,args) => {

const chat = message.key.remoteJid
const target = getTarget(message)

if(!target)
return client.sendMessage(chat,{
text:`⚜️ 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 ⚜️

❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐭𝐡𝐞 𝐦𝐞𝐦𝐛𝐞𝐫 𝐭𝐨 𝐫𝐞𝐦𝐨𝐯𝐞`
})

await client.groupParticipantsUpdate(chat,[target],'remove')

await client.sendMessage(chat,{
text:`👑 𝐌𝐞𝐦𝐛𝐞𝐫 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦`
},{quoted:message})

}
},

{
name:'add',
aliases:['invite'],
category:'group',
description:'Add a member',
groupOnly:true,
adminOnly:true,

execute: async(client,message,args)=>{

const chat = message.key.remoteJid
const num = args[0]?.replace(/[^0-9]/g,'')

if(!num)
return client.sendMessage(chat,{
text:`⚜️ 𝐐𝐮𝐞𝐞𝐧 𝐋𝐮𝐜𝐢𝐚 ⚜️

❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐮𝐦𝐛𝐞𝐫`
})

const target = num+'@s.whatsapp.net'

await client.groupParticipantsUpdate(chat,[target],'add')

await client.sendMessage(chat,{
text:`🌺 𝐍𝐞𝐰 𝐦𝐞𝐦𝐛𝐞𝐫 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐭𝐡𝐞 𝐤𝐢𝐧𝐠𝐝𝐨𝐦`
},{quoted:message})

}
},

{
name:'promote',
aliases:['admin'],
category:'group',
description:'Promote a member',
groupOnly:true,
adminOnly:true,

execute: async(client,message)=>{

const chat = message.key.remoteJid
const target = getTarget(message)

if(!target)
return client.sendMessage(chat,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐭𝐡𝐞 𝐦𝐞𝐦𝐛𝐞𝐫`
})

await client.groupParticipantsUpdate(chat,[target],'promote')

client.sendMessage(chat,{
text:`👑 𝐀 𝐧𝐞𝐰 𝐚𝐝𝐦𝐢𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐜𝐫𝐨𝐰𝐧𝐞𝐝`
},{quoted:message})

}
},

{
name:'demote',
aliases:['unadmin'],
category:'group',
description:'Demote admin',
groupOnly:true,
adminOnly:true,

execute: async(client,message)=>{

const chat = message.key.remoteJid
const target = getTarget(message)

if(!target)
return client.sendMessage(chat,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐭𝐡𝐞 𝐦𝐞𝐦𝐛𝐞𝐫`
})

await client.groupParticipantsUpdate(chat,[target],'demote')

client.sendMessage(chat,{
text:`⚜️ 𝐀𝐝𝐦𝐢𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐝𝐞𝐦𝐨𝐭𝐞𝐝`
},{quoted:message})

}
},

{
name:'gname',
aliases:['setname'],
category:'group',
description:'Change group name',
groupOnly:true,
adminOnly:true,

execute: async(client,message,args)=>{

const chat = message.key.remoteJid
const name = args.join(' ')

if(!name)
return client.sendMessage(chat,{
text:`❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐧𝐚𝐦𝐞`
})

await client.groupUpdateSubject(chat,name)

client.sendMessage(chat,{
text:`🌺 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 𝐧𝐚𝐦𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝`
},{quoted:message})

}
},

{
name:'gdesc',
aliases:['setdesc'],
category:'group',
description:'Change description',
groupOnly:true,
adminOnly:true,

execute: async(client,message,args)=>{

const chat = message.key.remoteJid
const desc = args.join(' ')

if(!desc)
return

await client.groupUpdateDescription(chat,desc)

client.sendMessage(chat,{
text:`✨ 𝐆𝐫𝐨𝐮𝐩 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝`
},{quoted:message})

}
},

{
name:'glink',
aliases:['invitelink'],
category:'group',
description:'Get group link',
groupOnly:true,
adminOnly:true,

execute: async(client,message)=>{

const chat = message.key.remoteJid
const code = await client.groupInviteCode(chat)

client.sendMessage(chat,{
text:`👑 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 𝐢𝐧𝐯𝐢𝐭𝐞 𝐥𝐢𝐧𝐤

https://chat.whatsapp.com/${code}`
})

}
},

{
name:'revoke',
aliases:['resetlink'],
category:'group',
description:'Reset group link',
groupOnly:true,
adminOnly:true,

execute: async(client,message)=>{

const chat = message.key.remoteJid

await client.groupRevokeInvite(chat)

client.sendMessage(chat,{
text:`⚜️ 𝐊𝐢𝐧𝐠𝐝𝐨𝐦 𝐢𝐧𝐯𝐢𝐭𝐞 𝐥𝐢𝐧𝐤 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐫𝐞𝐬𝐞𝐭`
})

}
}

];