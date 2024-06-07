const { addKeyword } = require("@bot-whatsapp/bot");
const pausarBotFlow = require("../otros/pausarBot.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟢 *ASESORÍA LEGAL COORPORATIVA* 🟢",
  " ",
  "🥳Excelente!! en un momento 🕧 un asesor se comunicará  con usted para brindarle la asesoría legal que necesita.🧑‍💻",
];

module.exports = addKeyword("##CONFIRMA_ASESORIA_LEGAL##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(
    titleText,
    { delay: 2000 },
    async (ctx, { provider, gotoFlow, endFlow }) => {
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
    }
  );
