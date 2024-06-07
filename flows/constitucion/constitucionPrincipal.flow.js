const { addKeyword } = require("@bot-whatsapp/bot");
const constitucionIndependienteFlow = require("./constitucionIndependiente.flow");
const constitucionSocioContableFlow = require("./constitucionSocioContable.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../../idleCasero");
const { TiempodeEspera } = require("../otros/TiempodeEspera");

const titleText = [
  "😎Excelente!!, aquí le muestro nuestros planes de *constitución de empresas.*",
  " ",
  "*1* Plan Independiente S/600 (*Solo* constitución de empresa)",
  "*2* Plan Socio S/250 (Constitución de Empresa *+ Servicio de contabilidad*)",
  "*3* Quiero Regresar al menú principal",
  " ",
  "Elije el plan que mas se ajuste a sus necesidades (Ejemplo *1*)",
];

module.exports = addKeyword("##CONSTITUCION_EMPRESA_PRINCIPAL##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })

  .addAnswer(
    titleText,
    {
      delay: 1000,
      media:
        "https://zcontable.com/wp-content/uploads/2024/01/planes-constitucion-1.jpeg",
      capture: true,
    },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo constitucion de empresa");
      const body = ctx.body;
      const sock = await provider.getInstance();
      const id = ctx.key.remoteJid;
      switch (body) {
        case "1":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2600)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(constitucionIndependienteFlow);
        case "2":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2600)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(constitucionSocioContableFlow);
        case "3":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2600)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(require("../disponibleServicio.flow"));
        default:
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 3*"
          );
      }
    }
  );
