const { addKeyword } = require("@bot-whatsapp/bot");
const elijesocioContablesecundarioFlow = require("./elijesocioContablesecundario.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "🟠 PLAN SOCIO 🟠",
  "_Ideal para quien NO tiene un Contador_",
  " ",
  "👍Este precio es preferencial para aquellos emprendedores y empresarios que muy aparte de tomar nuestro servicio de constitución de empresa toman nuestro servicio de contabilidad.‼️🥳🥳(Precio solo por Temporada)🥳🥳‼️",
];

const opcionesText = [
  "Escriba *1* Que incluye el servicio CONTABLE?",
  "Escriba *2* Para volver al menú anterior",
  "Escriba *3* Para volver al menú principal",
];

module.exports = addKeyword("##PLAN_SOCIO_CONTABLE##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })

  // .addAnswer(" ", {
  //   media: "https://zcontable.com/wp-content/uploads/2024/01/garantiaZ.jpeg",
  // })
  .addAnswer(titleText, {
    delay: 2000,
    media: "https://zcontable.com/wp-content/uploads/2024/01/plansocio1.jpeg",
  })
  .addAnswer(
    opcionesText,
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo plan socio contable");
      const body = ctx.body;
      switch (body) {
        case "1":
          stopInactividad(ctx);
          return gotoFlow(elijesocioContablesecundarioFlow);
        case "2":
          stopInactividad(ctx);
          return gotoFlow(require("./constitucionPrincipal.flow"));
        case "3":
          stopInactividad(ctx);
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n elija del *1 al 3*"
          );
      }
    }
  );
