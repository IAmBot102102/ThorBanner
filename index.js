var Discord = require("Discord.io");
const token = "NjM5NjE5OTUzNDcyODMxNDg5.XbuBsQ.a72lHICKFDUY54-ON2OF-QzvelQ";

const client = new Discord.Client({
    token: token,
    autorun: true
 });

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("message", message => {
  if(message.author.bot) return;
  // Also good practice to ignore any message that does not start with our prefix, 

  // which is set in the configuration file.

  if(message.content.indexOf(">") !== 0 || message.content.indexOf("!") !== 0) return;

  

  // Here we separate our "command" name, and our "arguments" for the command. 

  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:

  // command = say

  // args = ["Is", "this", "the", "real", "life?"]

  

  // Let's go with a few common example commands! Feel free to delete or change those.

  
    var command = message.content;

  


  if(command.startsWith(">kick")){
    let member = message.mentions.members.first();

    if(!member)

      return message.reply("Please mention a valid member of this server");
    
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: I said so! :wave:`);
  }

  if(command.startsWith("!kick")) {

    // This command must be limited to mods and admins. In this example we just hardcode the role names.

    // Please read on Array.some() to understand this bit: 

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?

    if(!message.member.roles.some(r=>['Rubix'].includes(r.name)))

      return message.reply("Sorry, you don't have permissions to use this!");

    

    // Let's first check if we have a member and if we can kick them!

    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.

    // We can also support getting the member by ID, which would be args[0]

    let member = message.mentions.members.first();

    if(!member)

      return message.reply("Please mention a valid member of this server");

    if(!member.kickable) 

      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    

    // slice(1) removes the first part, which here should be the user mention or ID

    // join(' ') takes all the various parts to make it a single string.
    

    // Now, time for a swift kick in the nuts!

    member.kick()

      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: I said so! :wave:`);



  }

  

  if(command === "ban") {

    // Most of this command is identical to kick, except that here we'll only let admins do it.

    // In the real world mods could ban too, but this is just an example, right? ;)

    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )

      return message.reply("Sorry, you don't have permissions to use this!");

    

    let member = message.mentions.members.first();

    if(!member)

      return message.reply("Please mention a valid member of this server");

    if(!member.bannable) 

      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");



    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    

    member.ban("Nou")

      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);

  }
});
