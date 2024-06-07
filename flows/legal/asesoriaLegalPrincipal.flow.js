const { addKeyword } = require("@bot-whatsapp/bot");
const confirmaAsesorialegalFlow = require("./confirmaAsesorialegal.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟡 *ASESORÍA LEGAL COORPORATIVA* 🟡",
  " ",
  "_👩‍⚖️💼 Obtén asesoría legal experta para resolver tus problemas legales. Nuestros abogados te brindarán orientación y soluciones claras para tus asuntos legales. ¡Confía en nosotros para proteger tus derechos y encontrar la mejor solución! ✨🔍_",
];

const optionsText = [
  "Escriba *1* Deseo comunicarme con un asesor ",
  "Escriba *2* Para volver al menú principal",
];

module.exports = addKeyword("##ASESORIA_LEGAL_PRINCIPAL##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  // .addAction(async (ctx, { provider }) => {
  //   const id = ctx.key.remoteJid;

  //   const sock = await provider.getInstance();
  //   await sock.sendPresenceUpdate("composing", id);
  // })
  .addAnswer(titleText, { delay: 2000 })
  .addAnswer(
    optionsText,
    { capture: true },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo asesoria legal");
      const body = ctx.body;
      const sock = await provider.getInstance();
      const id = ctx.key.remoteJid;
      switch (body) {
        case "1":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2700)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(confirmaAsesorialegalFlow);
        case "2":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2700)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2100)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 2*"
          );
      }
    }
  );
