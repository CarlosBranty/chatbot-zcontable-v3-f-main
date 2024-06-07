const {addKeyword} = require('@bot-whatsapp/bot')

const noencontradoText = "🔴 Lamentablemente nuestro servicio aun no está disponible en su ciudad, esperamos llegar pronto a mas ciudades 🗺️"
const graciasText = "😊 Gracias por contactarnos, esperamos poder ayudarte en otra oportunidad \n 🙌 Puedes Escribir *MENU* para volver al menu principal"

module.exports = addKeyword('##FUERA_DE_SERVICIO##')
.addAnswer(noencontradoText,{delay:2000},
    async(ctx,{endFlow}) => {
        return endFlow(graciasText)
    })