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
  "✅ Constitución de empresa (Plan Socio S/250)",
  "✅ Plan contable (Plan Socio S/200)",
  "🕧 En un momento  un asesor se contactará con usted 🧑‍💻",
];

module.exports = addKeyword("##PLAN_CONTABLE_SOCIO_MAS_CONSTITUCION##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(titleText, { delay: 2000 })
  .addAnswer(" ", {
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
