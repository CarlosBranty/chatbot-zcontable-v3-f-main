const { addKeyword } = require("@bot-whatsapp/bot");
const { stopInactividad } = require("../../idleCasero");

const mainText = [
  "INFORMES",
  " ",
  "🏢 *OFICINA:* Calle Palacio Viejo 210 - 3er piso CERCADO DE AREQUIPA",
  "☎️ *FIJO:*  (054) 250988",
  "📞 *CELULAR:*  935986519 ",
  "🌐 *WEB:* https://zcontable.com/",
  "✉ *CORREO:* informes@zcontable.com ",
  " ",
  "*HORARIO DE ATENCIÓN:*",
  "*LUNES A VIERNES:* 9:00 A 1:00  – 2:00 A 5:00 ",
  "*SABADOS:* 9:00 A 1:00",
];

module.exports = addKeyword("##DIRECCION_PRINCIPAL##")
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(
    mainText,
    {
      delay: 2000,
      media:
        "https://zcontable.com/wp-content/uploads/2023/12/info-direccion.jpeg",
    },
    async (ctx, { endFlow }) => {
      stopInactividad(ctx);
      return endFlow();
    }
  );
