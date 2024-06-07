const { addKeyword } = require("@bot-whatsapp/bot");
const confirmaConstitucionindependienteFlow = require("./confirmaConstitucionindependiente.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟠 PLAN INDEPENDIENTE 🟠",
  "_Ideal para quien SI tiene un Contador_",
  " ",
  "😁Este precio es el COSTO REAL✅ de una constitución de empresa, son para emprendedores que solo desean contratar únicamente la constitución de su empresa sin la contabilidad.👀👀",
];

const optionsText = [
  "🥳 Escriba *CONFIRMAR* Para procesar  su solicitud de constitución de empresa",
  "↩️ Escriba *PRINCIPAL* Para regresar al menu  principal",
  " ",
  "_Luego de confirmar un agente se comunicará con usted para coordinar los ultimos detalles_",
];

module.exports = addKeyword("##PLAN_INDEPENDIENTE##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(titleText, {
    delay: 1000,
    media:
      "https://zcontable.com/wp-content/uploads/2024/01/planindependiente1.jpeg",
  })
  .addAnswer(
    optionsText,
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo plan independiente");
      const body = ctx.body.toUpperCase();
      switch (body) {
        case "CONFIRMAR":
          stopInactividad(ctx);
          return gotoFlow(confirmaConstitucionindependienteFlow);
        case "PRINCIPAL":
          stopInactividad(ctx);
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Escriba *CONFIRMAR* o *PRINCIPAL*"
          );
      }
    }
  );
