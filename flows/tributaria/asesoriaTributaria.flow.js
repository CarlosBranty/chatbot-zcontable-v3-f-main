const {addKeyword} = require('@bot-whatsapp/bot')
const confirmaAsesoriatributariaFlow = require('./confirmaAsesoriatributaria.flow')

const titleText = ['🟡 *ASESORÍA TRIBUTARIA* 🟡', ' ',
'_📊 Obtén ayuda experta para tus impuestos y obligaciones tributarias. Nuestra asesoría tributaria te guía en el laberinto de normativas, ¡asegurando que tu negocio brille sin preocupaciones ante Sunat! 💡🔍_']

const optionsText = ['Escriba *1* Deseo comunicarme con un asesor ',
'Escriba *2* Para volver al menú principal']

module.exports = addKeyword('##ASESORIA_TRIBUTARIA##')

.addAnswer(titleText,{delay:2000})
.addAnswer(optionsText,{capture:true},
    async(ctx,{fallBack, gotoFlow})=>{
        console.log('Estamos en el flujo asesoria tributaria')
        const body = ctx.body;
        switch (body) {
            case '1':
                return gotoFlow(confirmaAsesoriatributariaFlow)
            case '2':
                return gotoFlow(require('../principal.flow'))
            default:
                return fallBack('⚠️ La opción ingresada no es valida ⚠️ \n Elija una opción del *1 al 2*')
        }
    }

)
