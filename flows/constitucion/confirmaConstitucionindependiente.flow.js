const { addKeyword } = require("@bot-whatsapp/bot");
const pausarBotFlow = require("../otros/pausarBot.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "_📄Te enviamos el formulario de constitución, donde tienes que ingresar todos los datos de su empresa😉_",
  "Puedes reenviarlo en Word o fotos 📄",
];

const mainText = [
  "🟢 *TU SOLICITUD HA SIDO CONFIRMADA!!*",
  "✅ Constitución de empresa (Plan Independiente S/600)",
  "🕧 En un momento un asesor se contactará con usted 🧑‍💻",
];

module.exports = addKeyword("##CONFIRMA_PLAN_INDEPENDIENTE##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(titleText, { delay: 2000 })
  .addAnswer("_", {
    media:
      "https://zcontable.com/wp-content/uploads/2023/12/Formulario-Constitucion-de-Empresas-Zcontable.doc",
  })
  .addAnswer(mainText, null, async (ctx, { provider, gotoFlow }) => {
    resetInactividad(ctx, gotoFlow, TiempodeEspera);
    const id = ctx.key.remoteJid;
    console.log(id);
    const sock = await provider.getInstance();
    await sock.chatModify(
      {
        pin: true,
      },
      id
    );
    stopInactividad(ctx);
    return gotoFlow(pausarBotFlow);
  });
