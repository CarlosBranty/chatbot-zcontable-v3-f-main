const { addKeyword } = require("@bot-whatsapp/bot");
const confirmarPlansociocontableFlow = require("./confirmarPlansociocontable.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const mainText = [
  "🟡 Excelente!! procesando *PLAN SOCIO* 🟡",

  "_Plan de contabilidad (Plan socio *S/ 200*) 🥳_",
  " ",
  "Escriba *CONFIRMAR* para seguir con su solicitud",
  "Escriba *PRINCIPAL* para volver al menú principal",
];

module.exports = addKeyword("##PLAN_CONTABLE_SOCIO##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(
    mainText,
    { delay: 2000, capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("estamos en el flujo Plan contable Socio");
      const body = ctx.body.toUpperCase();
      switch (body) {
        case "CONFIRMAR":
          stopInactividad(ctx);
          return gotoFlow(confirmarPlansociocontableFlow);
        case "PRINCIPAL":
          stopInactividad(ctx);
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción entre *CONFIRMAR* o *PRINCIPAL*"
          );
      }
    }
  );
