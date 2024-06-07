const {addKeyword} = require('@bot-whatsapp/bot')
const pausarBotFlow = require('../otros/pausarBot.flow')

const titleText = ['🟢 ASESORÍA TRIBUTARIA SUNAT 🟢', ' ', 
'🥳Excelente!!🕧 en un momento un asesor se comunicará con usted para brindarle la asesoría tributaria que necesita.🧑‍💻']

module.exports = addKeyword('##CONFIRMA_ASESORIA_TRIBUTARIA##')
.addAnswer(titleText,null,
    async(ctx,{provider,gotoFlow}) =>{
       const id = ctx.key.remoteJid
       console.log(id)
       const sock = await provider.getInstance()
       await sock.chatModify(
           {
               pin:true
           },id)
        return gotoFlow(pausarBotFlow)
    } )