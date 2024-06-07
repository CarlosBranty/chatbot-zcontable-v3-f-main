const { addKeyword } = require("@bot-whatsapp/bot");
const plancontableSocioConstitucionFlow = require("./plancontableSocioConstitucion.flow");
const plancontableEmprendedorConstitucionFlow = require("./plancontableEmprendedorConstitucion.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🙌Excelente te muestro los planes contables disponibles🙌",
  " ",
  "😎 Por favor elija el plan que más se ajuste a sus necesidades",
];

const opcionesText = [
  "*1* Plan Socio S/200",
  "*2* Plan Emprendedor S/300",
  "*3* Para volver al menú Principal",
];

module.exports = addKeyword("##ELIJE_SOCIO_CONTABLE_CONSTITUCION##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  // .addAction(async (ctx, { provider }) => {
  //   const id = ctx.key.remoteJid;

  //   const sock = await provider.getInstance();
  //   await sock.sendPresenceUpdate("composing", id);
  // })
  .addAnswer(" ", {
    media:
      "https://zcontable.com/wp-content/uploads/2023/12/serv-contable-zcontable.jpg",
  })
  .addAnswer(" ", {
    media:
      "https://zcontable.com/wp-content/uploads/2023/12/plancontable-img.jpeg",
  })
  .addAnswer(titleText, {
    media: "https://zcontable.com/wp-content/uploads/2024/01/garantiaZ.jpeg",
  })
  .addAnswer(
    opcionesText,
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo elije socio contable");
      const body = ctx.body;
      switch (body) {
        case "1":
          stopInactividad(ctx);
          return gotoFlow(plancontableSocioConstitucionFlow);
        case "2":
          stopInactividad(ctx);
          return gotoFlow(plancontableEmprendedorConstitucionFlow);
        case "3":
          stopInactividad(ctx);
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 3*"
          );
      }
    }
  );
