const { addKeyword } = require("@bot-whatsapp/bot");
const pausarBotFlow = require("./otros/pausarBot.flow");
const { stopInactividad } = require("../idleCasero");

module.exports = addKeyword([
  "#ASESOR",
  "#Asesor",
  "#asesor",
  "asesor",
]).addAnswer(
  ["_En breve un asesor se contactará con Ud. por favor espere un momento_"],
  null,
  async (ctx, { gotoFlow }) => {
    stopInactividad(ctx);
    return gotoFlow(pausarBotFlow);
  }
);
