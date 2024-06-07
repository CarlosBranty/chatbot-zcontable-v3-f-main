const { addKeyword } = require("@bot-whatsapp/bot");
const confirmaAuditoriacontableFlow = require("./confirmaAuditoriacontable.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟡 *AUDITORÍA CONTABLE* 🟡",
  " ",
  "_🔍📊 ¡Descubre la claridad en tus números! Nuestro servicio de auditoría contable es como una lupa para tus finanzas. Revisamos cada detalle para garantizar precisión y transparencia en tus registros. Confía en nosotros para mantener tus cuentas en orden y ¡hacer brillar tus balances! 💼✨_",
];

const optionsText = [
  "Escriba *1* Deseo comunicarme con un asesor ",
  "Escriba *2* Para volver al menú principal",
];

module.exports = addKeyword("##AUDITORIA_CONTABLE_PRINCIPAL##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })

  .addAnswer(titleText, { delay: 2000 })
  .addAnswer(
    optionsText,
    { capture: true },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo auditoria contable");
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
            }, 2500)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(confirmaAuditoriacontableFlow);
        case "2":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2500)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 1800)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 2*"
          );
      }
    }
  );
