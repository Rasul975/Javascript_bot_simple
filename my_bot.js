
const Discord = require("discord.js");
const { token } = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("with Javascript");

    client.guilds.forEach((guild) => {
        console.log(guild.name);
        guild.channels.forEach((channel)=> {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        })

        // general text 669498261521956909

    })

    // let generalChannel = client.channels.get("669498261521956909");
    // const attachment = new Discord.Attachment("https://www.reddit.com/");
    // generalChannel.send(attachment);
});

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user) return;
    if (receivedMessage.content.startsWith("!")){
        processCommand(receivedMessage);
    }
});

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    if (primaryCommand == "help"){
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == "multiply"){
        multiplyCommand(arguments, receivedMessage);
    } else if (!receivedMessage.guild) return;
    
        if (receivedMessage.content.startsWith('!kick')) {
            const user = receivedMessage.mentions.users.first();
            if (user) {
            const member = receivedMessage.guild.member(user);
            if (member) {
                member.kick('Optional reason that will display in the audit logs').then(() => {
                receivedMessage.reply(`Successfully kicked ${user.tag}`);
                }).catch(err => {
                receivedMessage.reply('I was unable to kick the member');
                console.error(err);
                });
            } else {
                receivedMessage.reply('That user isn\'t in this guild!');
            }
            } else {
            receivedMessage.reply('You didn\'t mention the user to kick!');
            }
        
    } else {
        receivedMessage.channel.send("Command not found. Try '!help or '!multiply'");
    };
}


function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("Unknown");
    } else {
        receivedMessage.channel.send("YOU DONT NEED HELP WITH " + arguments);
    }
};

function multiplyCommand(arguments, receivedMessage){
    if(arguments.length < 2){
        receivedMessage.channel.send("not enough");
    } else {
        let product = 1;
        arguments.forEach((value) => {
            product *= parseFloat(value);
        });
        receivedMessage.channel.send("multiply " + arguments + " is " + product.toString());
    }
};

client.login(token);