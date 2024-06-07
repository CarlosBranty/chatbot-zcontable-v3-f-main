const { addKeyword } = require("@bot-whatsapp/bot");
const pausarBotFlow = require("../otros/pausarBot.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟢 *AUDITORÍA CONTABLE* 🟢",
  " ",
  "🥳Excelente!! 🕧 en un momento  un asesor se comunicará con usted para brindarle la asesoría sobre auditoria contable.🧑‍💻",
];

module.exports = addKeyword("##CONFIRMA_AUDITORIA_CONTABLE##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAnswer(
    titleText,
    { delay: 2000 },
    async (ctx, { provider, gotoFlow }) => {
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
