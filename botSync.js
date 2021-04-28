const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("guildBanAdd", function(guild, user){
        let reason = ""
        client.guilds.cache.map((guild) => {
            guild.fetchBan(user).then((user)=>{
                // console.log(`${user.user.username} is already banned in ${guild.name} for ${user.reason}`)
                reason = user.reason
            },
            ()=>{
                guild.members.ban(user.id, {reason: reason})
                .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name} for "${reason}"`), error => console.log(error))
            })
        })


})

client.on("guildBanRemove", function(guild, user){


    client.guilds.cache.map((guild) => {
        guild.fetchBan(user).then((user)=>{
            guild.members.unban(user.user.id)
                .then(
                    user => console.log(`Unbanned ${user.username} from ${guild.name}`),
                    error => console.log("error:", error)
                )
        },()=>{
            // console.log(`${user.username} is not banned in ${guild.name}`)
        })
    })
})

client.login(config.token)