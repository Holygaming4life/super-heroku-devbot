const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const superagent = require("superagent");
const randomPuppy = require("random-puppy");
const ms = require("ms");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags")
const dateFormat = require("dateformat")
const fortnite = require("simple-fortnite-api"), client = new fortnite("a95f9cb9-1eb6-447b-aa25-eded02520f8a")

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Hello", { type: "WATCHING" });
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    prefix = ".";

    ///////////FUN/INFO
    if (cmd === `${prefix}fortnite`) {
        if (!args[0]) return message.channel.send("Please supply a username");
        if (args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send("Usuage: `!fortnite <username> <gametype>`\nGameTypes: Lifetime, Solo, Duo, Squad");
        let gametype = args[1] ? args[1].toLowerCase() : "lifetime";

        let data = await client.find(args[0])
        if (data && data.code === 404) return message.channel.send("Unable to find a user with that username.")
        const { image, url, username } = data;
        const { scorePerMin, winPercent, kills, score, wins, kd, matches } = data[gametype]

        let embed = new RichEmbed()
            .setColor("#00FF80")
            .setAuthor(`Epic Games (Fortnite) | ${username}`, image)
            .setThumbnail(image)
            .setDescription(stripIndents`**Gamemode:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)})
        **Kills:** ${kills || 0}
        **Score:** ${score || 0}
        **Score Per Min:** ${scorePerMin || 0}
        **Wins:** ${wins || 0}
        **Win Ratio:** ${winPercent || "0%"}
        **Kill/Death Ratio:** ${kd || 0}
        **Matches Played:** ${matches || 0}
        **Link:** [link to profile](${url}`)
            .setTimestamp()

        message.channel.send(embed)
    }

    if (cmd === `${prefix}help`) {

        const embed = new RichEmbed()
            .setColor('##FFB300')
            .setThumbnail(message.guild.iconURL)
            .setDescription(stripIndents`
            **Commands For Everyone:** help,serverinfo,userinfo,meme,dog,cat,steam,fortnite,ping
            **Commands For Moderators:** softban,ban,tempmute,mute,addrole,removerole,unban,unmute,kick   
            **Commands Only For Owner:** shutdown
            **Prefix:** ${prefix}`)
            .setTimestamp();

        message.channel.send(embed)
    }


    if (cmd === `${prefix}serverinfo`) {
        let sEmbed = new Discord.RichEmbed()
            .setColor('#f55a42')
            .setTitle("Server Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Server Name:**", `${message.guild.name}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            .setFooter('DevBot | Footer', bot.user.displayAvatarURL);
        message.channel.send({ embed: sEmbed });
    }


    if (cmd === `${prefix}userinfo`) {
        let uEmbed = new Discord.RichEmbed()
            .setColor('#f55a42')
            .setTitle("User Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.author.username} Info`, message.guild.iconURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**Status:**", `${message.author.presence.status}`, true)
            .addField("**Created At:**", `${message.author.createdAt}`, true)
            .setFooter('DevBot | Footer', bot.user.displayAvatarURL);
        message.channel.send({ embed: uEmbed });
    }


    if (cmd === `${prefix}cat`) {
        let msg = await message.channel.send("Generating.....")

        let { body } = await superagent
            .get(`http://aws.random.cat/meow`)
        if (!{ body }) return message.channel.send("I broke myself, please try again!")

        let cEmbed = new Discord.RichEmbed()
            .setColor('#1A00FF')
            .setAuthor('A special gift from Devbot, CATTTTSS!', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`Devbot`, bot.user.displayAvatarURL)

        message.channel.send({ embed: cEmbed })

        msg.delete();
    }


    if (cmd === `${prefix}dog`) {
        let msg = await message.channel.send("Generating.....")

        let { body } = await superagent
            .get(`https://dog.ceo/api/breeds/image/random`)
        if (!{ body }) return message.channel.send("I broke myself, please try again!")

        let dEmbed = new Discord.RichEmbed()
            .setColor('#1A00FF')
            .setAuthor('A special gift from Devbot, DOOOGGGSSS!', message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(`Devbot`, bot.user.displayAvatarURL)

        message.channel.send({ embed: dEmbed })

        msg.delete();
    }

    if (cmd === `${prefix}meme`) {
        let msg = await message.channel.send("Generating.....")

        fetch(`https://apis.duncte123.me/meme`)
            .then(res => res.json()).then(body => {
                if (!{ body }) return message.channel.send("I broke myself, please try again!")

                let mEmbed = new Discord.RichEmbed()
                    .setColor('#1A00FF')
                    .setAuthor('A special gift from Devbot, MMMEEEEMMEESSS!', message.guild.iconURL)
                    .setImage(body.data.image)
                    .setTimestamp()
                    .setFooter(`Devbot`, bot.user.displayAvatarURL)

                msg.edit(mEmbed)
            }
            )
    }


    if (cmd === `${prefix}seal`) {
        let msg = await message.channel.send("Generating.....")

        fetch(`https://apis.duncte123.me/seal`)
            .then(res => res.json()).then(body => {
                if (!{ body }) return message.channel.send("I broke myself, please try again!")

                let mEmbed = new Discord.RichEmbed()
                    .setColor('#1A00FF')
                    .setAuthor('A special gift from Devbot, MMMEEEEMMEESSS!', message.guild.iconURL)
                    .setImage(body.file)
                    .setTimestamp()
                    .setFooter(`Devbot`, bot.user.displayAvatarURL)

                msg.edit(mEmbed)
            }
            )
    }

    if (cmd === `${prefix}ping`) {
        message.channel.send("Pinging....").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Wow thats your ping?", "That is crazy ping!", "I cant even look at those numbers!"]
            let response = choices[Math.floor(Math.random() * choices.length)]

            m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
        })
    }

    if (cmd === `${prefix}steam`) {
        const token = "9790E062E32C855E758237B0B47C51D2";
        if (!args[0]) return message.channel.send("Please provide an account name.")
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42) return message.channel.send("I was unable to find a steam profile with that name.")

            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
            const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"]

            fetch(summaries).then(res => res.json()).then(body => {
                if (!body.response) return message.channel.send("I was unable to find that steam profile");
                const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

                fetch(bans).then(res => res.json()).then(body => {
                    if (!body.players) return message.channel.send("I was unable to find that steam profile");
                    const { NumberOfVACBans, NumberOfGameBans } = body.players[0]

                    const embed = new RichEmbed()
                        .setColor('#0099ff')
                        .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(stripIndents`**Real Name:** ${realname || "Unknown"}
                **Status:** ${state[personastate]}
                **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:  
                **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [link to profile](${profileurl})`)
                        .setTimestamp();

                    message.channel.send(embed)
                })
            })
        })
    }

    ////////////////////////MODERATION
    if (cmd === `${prefix}mute`) {

        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You do not have permission to use this command, why are you even trying it?");

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to add roles!")


        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!mutee) return message.channel.send("Please supply a user to be muted!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given."

        let muterole = message.guild.roles.find(r => r.name === "Muted")
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#E21717",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }
        mutee.addRole(muterole.id).then(() => {
            message.delete();
            mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)
            message.channel.send(`${mutee.user.username} was successfully muted.`)
        })

        let rEmbed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "mute")
            .addField("Mutee:", mutee.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(rEmbed)
    }

    if (cmd === `${prefix}unmute`) {

        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You do not have permission to use this command, why are you even trying it?");

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this")

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!mutee) return message.channel.send("Please supply a user to be muted!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given."

        let muterole = message.guild.roles.find(r => r.name === "Muted")
        if (!muterole) return message.channel.send("This member isn\'t muted, there is no umuteing them.")

        mutee.removeRole(muterole.id).then(() => {
            message.delete()
            mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} is unmuted.`)
        })

        let r2Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "mute")
            .addField("Mutee:", mutee.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r2Embed)
    }


    if (cmd === `${prefix}tempmute`) {
        let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!tomute) return message.reply("Please supply a valid user to be tempmuted!");

        if (tomute.hasPermissions("MANAGE_MESSAGES")) return message.reply("I cannot mute that member");


        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) return message.reply("A Mute role does not exist!")



        let mutetime = args[1];
        if (!mutetime) return message.reply("You didn't specify a time!");

        await (tomute.addRole(muterole.id));
        message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function () {
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`);
        }, ms(mutetime));
    }

    if (cmd === `${prefix}ban`) {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command.")

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!banMember) return message.channel.send("Please providea user to ban!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hahah, we can't ban staff or admins")


        banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
            message.guild.ban(banMember, { days: 1, reason: reason })).catch(err => console.log(err))

        message.channel.send(`**${banMember.user.tag}** has been banned!`)
        let r3Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "ban")
            .addField("Banned Member:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r3Embed)


    }


    if (cmd === `${prefix}softban`) {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command.")

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!banMember) return message.channel.send("Please providea user to softban!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hahah, we can't softban staff or admins")


        banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
            message.guild.ban(banMember, { days: 1, reason: reason })).then(() => message.guild.unban(banMember.id, { reason: "Softban" })).catch(err => console.log(err))

        message.channel.send(`**${banMember.user.tag}** has been softbanned!`)
        let r3Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "ban")
            .addField("Softbanned Member:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r3Embed)
    }

    if (cmd === `${prefix}kick`) {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command.")

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!kickMember) return message.channel.send("Please provide user to kick!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hahah, we can't kick staff or admins")

        kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
            kickMember.kick()).catch(err => console.log(err))

        message.channel.send(`**${kickMember.user.tag}** has been kicked!`)

        let r4Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "kick")
            .addField("Kicked Member:", kickMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r4Embed)
    }

    if (cmd === `${prefix}shutdown`) {
        if (message.author.id != "361316549505712131") return message.channel.send("You are not the bot owner!")

        try {
            await message.channel.send("The Bot is shutting down.... NOOOO SAVE ME PLEAseeeee")
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    }

    if (cmd === `${prefix}addrole`) {
        if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command.")

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if (!rMember) return message.channel.send("Please provide user to add a role to!")

        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send("Please provide a role to add to said member.")

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given!"


        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command.")

        if (!rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName} already has that role!`)
        } else {
            await rMember.addRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role ${role.name} has been added to ${rMember.displayName}!`)
        }

        let r5Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "AddRole")
            .addField("Member Who Received The Role:", rMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r5Embed)
    }

    if (cmd === `${prefix}removerole`) {
        if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command.")

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if (!rMember) return message.channel.send("Please provide user to remove a role from!")

        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send("Please provide a role to remove from said member.")

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason given!"


        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command.")

        if (!rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName} doesn't have that role!`)
        } else {
            await rMember.removeRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role ${role.name} has been removed from ${rMember.displayName}!`)
        }

        let r5Embed = new Discord.RichEmbed()
            .setColor("#666666")
            .setAuthor(`${message.guild.name} public-mod-logs`, message.guild.iconURL)
            .addField("Moderation:", "RemoveRole")
            .addField("Member Who Lost The Role:", rMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "public-mod-logs")
        sChannel.send(r5Embed)
    }

});
bot.login(process.env.BOT_TOKEN);
