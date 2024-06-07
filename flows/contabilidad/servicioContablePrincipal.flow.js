const { addKeyword } = require("@bot-whatsapp/bot");
const planContablesocioFlow = require("./planContablesocio.flow");
const planContableEmprendedorFlow = require("./planContableEmprendedor.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "😀 Excelente te muestro los planes contables disponibles",
  "😎 Por favor elija el plan que más se ajuste a sus necesidades ",
  " ",
  "*1* Plan Socio S/200",
  "*2* Plan Emprendedor S/300",
  "*3* Volver al menú Principal",
];

module.exports = addKeyword("##SERVICIO_CONTABLE_PRINCIPAL##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })

  .addAnswer(" ", {
    media:
      "https://zcontable.com/wp-content/uploads/2023/12/serv-contable-zcontable.jpg",
  })
  .addAnswer(" ", {
    media:
      "https://zcontable.com/wp-content/uploads/2023/12/plancontable-img.jpeg",
  })
  .addAnswer(
    titleText,
    {
      capture: true,
      media: "https://zcontable.com/wp-content/uploads/2024/01/garantiaZ.jpeg",
    },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en Servicio Contable Principal");
      const sock = await provider.getInstance();
      const id = ctx.key.remoteJid;
      const body = ctx.body;

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
          return gotoFlow(planContablesocioFlow);
        case "2":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2600)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(planContableEmprendedorFlow);
        case "3":
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
            }, 2200)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 3*"
          );
      }
    }
  );
