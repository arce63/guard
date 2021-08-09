const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true});
client.setMaxListeners(50);
const request = require("request");


const dokunma = ["589079197906108416","831506123605016638","857342337369112646","852602428002926617","",""];
const sunucu = "872801707514540032"; 

const strigarol = '872865187433185340'// RAPOR VERMESİ İÇİN LOG ID
const strigakanal = '872880447439392778'// RAPOR VERMESİ İÇİN LOG ID
const strigasunucu = '872801707808153639'// RAPOR VERMESİ İÇİN LOG ID
const strigaurl = '872801708118523934'// RAPOR VERMESİ İÇİN LOG ID
const strigabotkoruma = '872880447439392778' // RAPOR VERMESİ İÇİN LOG ID
const botroles = ["872866300530163793","872817620401942539","872873241490907157","872868993709518878","872876579989123103","",""]; // BOT ROLLERI
const arr = ["ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_NICKNAMES"];

client.token = "process.env.token";

client.on("ready", async () => {
dokunma.push(client.user.id);
console.log(`[BOT] | Sunucu Üzerinde Değişiklik Yapabilen ID'ler: ${dokunma}
[BOT] | Bot Başarıyla Aktif Edildi! || #Comeback`);
client.user.setActivity("Arcenio 💖 Alves");
client.user.setStatus("online");
});


//-----------------------------------KANAL KORUMA--------------------------------\\

client.on("channelDelete", async (channel) => {
const guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if (logs.entries.first().action === `CHANNEL_DELETE`) {
const id = logs.entries.first().executor.id;
if (!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)})});
uye.ban({reason: "Kanal Silmekten Yasaklandı.", days: 7});
let yazı = 'Guard | Kanal Koruması'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${channel.name} Kanalını Sildi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigakanal).send(strigaembed)
} else { };
} else { };
})});

//-----------------------------------KANAL KORUMA--------------------------------\\




//-----------------------------------ROL KORUMA--------------------------------\\

client.on("roleDelete", async (role) => {
const guild = role.guild;
let sil = guild.roles.cache.get(role.id);
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_DELETE`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name); x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Rol Silmekten Yasaklandı.", days: 7});
let yazı = 'Guard | Rol Koruması'  
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${role.name} Rolünü Sildi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#acaa37')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigarol).send(strigaembed)
} else { };
} else { };});});
//-----------------------------------ROL KORUMA--------------------------------\\





//-----------------------------------ROL KORUMA--------------------------------\\

client.on("roleUpdate", async (oldRole, newRole) => { 
let guild = newRole.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_UPDATE`) {
let id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(!arr.some(a => oldRole.permissions.has(a)) && arr.some(a => newRole.permissions.has(a))) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => { return ( arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {
console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
});
uye.ban({reason: "Rol Güncellemekten Yasaklandı.", days: 7});
let yazı = 'Guard | Rol Koruması'  
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${newRole.name} Rolüne Yetki Verdi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#378fac')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigarol).send(strigaembed)
} else { };
} else { };
} else { };
});
});
//-----------------------------------ROL KORUMA--------------------------------\\






//-----------------------------------BOT KORUMA--------------------------------\\

client.on("guildMemberAdd", async (member) => {
const guild = member.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `BOT_ADD`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(member.user.bot){
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({ reason: "Sunucuya Bot Getirdiği İçin Yasaklandı.", days: 7 });
member.ban({ reason: "Sunucuya Bot İzinsiz Çekildi.", days: 7 })
let yazı = 'Guard | Bot Koruması'  
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucuya ${member} Botunu Ekledi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#5ba4cc')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigabotkoruma).send(strigaembed)
} else { };
} else { };
} else { };});});
//-----------------------------------BOT KORUMA--------------------------------\\





//-----------------------------------SUNUCU KORUMA--------------------------------\\

client.on("guildUpdate", async (oldGuild, newGuild) => {
newGuild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `GUILD_UPDATE`) {
var yapan = logs.entries.first().executor;
let id = yapan.id;
const uye = newGuild.members.cache.get(id);
const kullanici = newGuild.members.cache.get(client.user.id);
if(oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
if(!dokunma.includes(id)) {
request({
method: "PATCH",
url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
headers: {
Authorization: `Bot ${client.token}`},
json: {code: `${oldGuild.vanityURLCode}`}});
newGuild.roles.cache.filter(r => { return(arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition);}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Url'yi Değiştirdiği İçin Yasaklandı.", days: 7});
let yazı = 'Guard | Url Koruması'  
const strigaembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucunun Urlsini Değiştirdi.\n\n Sunucunun Urlsini \`${newGuild.vanityURLCode}\` Olarak Değiştirdi, ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigaurl).send(strigaembed)
} else { };
} else if (oldGuild.name !== newGuild.name) {
if(!dokunma.includes(id)) {
newGuild.setName(oldGuild.name);
uye.ban({reason: "Sunucunun İsmini Değiştirdiği İçin Yasaklandı", days: 7});
newGuild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
let yazı = 'Guard | Sunucu Koruması'  
const strigaembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucu Ayarlarını Güncelledi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(`Eternal Unity #Comeback`)
client.channels.cache.get(strigasunucu).send(strigaembed)});
} else { };
} else { };
} else { };});});

process.on("uncaughtExpection", function (err) {
  if (err) console.log(err);
});

//-----------------------------------SUNUCU KORUMA--------------------------------\\

client.login(process.env.token);

//-----------------------------------BOTU-SESE-SOKMA---------------------------------------------------\\


client.on("ready", () => {
  client.channels.cache.get("872801709276168216").join();   
}) 
//------------------------------------BOTU-SESE-SOKMA------------------------------------------------\\
