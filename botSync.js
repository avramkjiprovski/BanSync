const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("guildBanAdd", function(guild, user){
    // [x] - find a way to traverse guilds
    // [x] - on ban in one guild, ban the same user in all other guilds.
    client.guilds.cache.map((guild) =>{
        guild.members.ban(user.id)
        .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))
        .catch(console.error)
    })
    
    
})

client.on("guildBanRemove", function(guild, user){
    client.guilds.cache.map((guild)=>{
        guild.members.unban(user.id)
        .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
        .catch(console.error);
    })
})

client.login(config.token)