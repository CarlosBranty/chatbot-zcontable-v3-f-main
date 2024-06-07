const { addKeyword } = require("@bot-whatsapp/bot");
const constitucionPrincipalFlow = require("./constitucion/constitucionPrincipal.flow");
const servicioContablePrincipalFlow = require("./contabilidad/servicioContablePrincipal.flow");
const asesoriaTributariaFlow = require("./tributaria/asesoriaTributaria.flow");
const asesoriaLegalPrincipalFlow = require("./legal/asesoriaLegalPrincipal.flow");
const auditoriaContablePrincipalFlow = require("./auditoria/auditoriaContablePrincipal.flow");
const direccionPrincipalFlow = require("./otros/direccionPrincipal.flow");
const {
  startInactividad,
  resetInactividad,
  stopInactividad,
} = require("../idleCasero");
const { TiempodeEspera } = require("./otros/TiempodeEspera");

const titleText = [
  "🧑‍💻 Agradecemos que nos indique el tema de su consulta para apoyarlo:",
  "*(Elija un número por favor ejemplo 1 )*",
];
const optionsText = [
  "*1* Constitución de empresas",
  "*2* Servicio de contabilidad para tu negocio",
  "*3* Asesoría tributaria casos SUNAT",
  "*4* Asesoría legal corporativa",
  "*5* Auditoría contable",
  "*6* Dirección horarios y Otros",
];

module.exports = addKeyword("##DISPONIBLE_SERVICIO##")
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })

  .addAnswer(titleText, { delay: 1000 })
  .addAnswer(
    optionsText,
    { capture: true, delay: 2000 },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo disponible eleccion de servicio");
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
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(constitucionPrincipalFlow);
        case "2":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2800)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(servicioContablePrincipalFlow);
        case "3":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(asesoriaTributariaFlow);
        case "4":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(asesoriaLegalPrincipalFlow);
        case "5":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(auditoriaContablePrincipalFlow);
        case "6":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(direccionPrincipalFlow);
        default:
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(
            "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *1 al 6*"
          );
      }
    }
  );
