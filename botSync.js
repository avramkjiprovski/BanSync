const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
//   client.guilds.cache.map((guild) => {
//       console.log("map:", guild)
//   })
});

client.on("guildBanAdd", function(guild, user){
    // [x] - find a way to traverse guilds
    // [x] - on ban in one guild, ban the same user in all other guilds.
    // [] - check audit logs
    // 
        client.guilds.cache.map((guild) => {
            guild.fetchBan(user).then((user)=>{
                console.log(`${user.user.username} is already banned`)
            },()=>{
                guild.members.ban(user.id)
                .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`), error => console.log(error))
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
            console.log(`\n${user.username} is not banned in ${guild.name}`)
        })
    })
    
    // client.guilds.cache.map((guild) => {
    //     guild.members.unban(user.id)
    //     .then(
    //         user => console.log(`Unbanned ${user.username} from ${guild.name}`),
    //         user => console.log(`${user} has already been unbanned from ${guild.name}`))
    // })
})

client.login(config.token)