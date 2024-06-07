const { addKeyword } = require("@bot-whatsapp/bot");
const confirmarPlanemprendedorcontableFlow = require("./confirmarPlanemprendedorcontable.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const mainText = [
  "🟡 Excelente!! procesando *PLAN EMPRENDEDOR* 🟡",
  "_Plan de contabilidad (Plan Emprendedor *S/ 300*) 🥳_",
  " ",
  "Escriba *CONFIRMAR* para seguir con su solicitud",
  "Escriba *PRINCIPAL* para volver al menu principal",
];

module.exports = addKeyword("##PLAN_CONTABLE_EMPRENDEDOR##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAnswer(
    mainText,
    { delay: 2000, capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("estamos en el flujo Plan contable Emprendedor");
      const body = ctx.body.toUpperCase();
      switch (body) {
        case "CONFIRMAR":
          stopInactividad(ctx);
          return gotoFlow(confirmarPlanemprendedorcontableFlow);
        case "PRINCIPAL":
          stopInactividad(ctx);
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción entre *CONFIRMAR* o *PRINCIPAL*"
          );
      }
    }
  );
