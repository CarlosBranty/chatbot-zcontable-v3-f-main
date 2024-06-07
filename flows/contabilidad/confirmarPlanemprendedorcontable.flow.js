const { addKeyword } = require("@bot-whatsapp/bot");
const pausarBotFlow = require("../otros/pausarBot.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const mainText = [
  "🟢 *TU SOLICITUD HA SIDO CONFIRMADA!! 🟢*",
  "✅ Servicio contable (Plan Socio S/300)",
  " ",
  "en un momento un asesor se contactará con usted",
];

module.exports = addKeyword("##CONFIRMA_PLAN_CONTABLE_EMPRENDEDOR##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAnswer(mainText, { delay: 2000 }, async (ctx, { provider, gotoFlow }) => {
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
