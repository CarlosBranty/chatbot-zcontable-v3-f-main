const { NumerosTelefonico } = require("./otros/NumerosTelefonico");
const { TiempodeEspera } = require("./otros/TiempodeEspera");

const defautEstado = { ecendido: true };

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const fueradeServicioFlow = require("./fueradeServicio.flow");
const disponibleServicioFlow = require("./disponibleServicio.flow");
const {
  startInactividad,
  stopInactividad,
  resetInactividad,
} = require("../idleCasero");
const { createClient, connect } = require("../clientpg");

const client = createClient();
connect(client);

const getEstado = async (numeroTelefono) => {
  try {
    console.log("getEstado", numeroTelefono);
    const query = "SELECT encendido FROM numeros_telefonicos WHERE numero = $1";
    const values = [numeroTelefono];

    const result = await client.query(query, values);
    // console.log("result", result);

    if (result.rows.length > 0) {
      // console.log(encendido);

      return { encendido: result.rows[0].encendido };
    } else {
      // El número no existe en la base de datos, asumimos apagado
      // console.log(encendido);
      return { encendido: true };
    }
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    // Vuelve a lanzar el error para que pueda ser manejado en el contexto superior si es necesario
  }
  // return NumerosTelefonico[numeroTelefono] || defautEstado;
};

const bienvenidaText =
  "🙌 *Bienvenido a Estudio Contable Zapana & Chavez 🥳❗❗*";
const mainoptionsText = [
  "👉 Por favor indícanos de que ciudad nos escribe (Ejemplo: *3*)",
  " ",
  "⚠️ Si no encuentra su ciudad, por favor escriba *0*",
];
const novalidoptionText =
  "⚠️ La opción ingresada no es válida ⚠️ \n Elija una opción del *0 al 7*";

module.exports = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    const numerTelefono = ctx.from;
    console.log(`REVISANDO SI ${numerTelefono} ESTA ENCENDIDO`);
    console.log(ctx.body);

    const estado = await getEstado(numerTelefono);
    if (!estado.encendido) {
      console.log(`BOT APAGADO PARA ${numerTelefono}`);
      if (ctx.body.toUpperCase() === "ZBOT") {
        return gotoFlow(require("./otros/encenderBot.flow"));
      }
      return endFlow();
    }

    console.log(`BOT ENCENDIDO PARA ${numerTelefono}`);
  })
  .addAction(async (ctx, { gotoFlow }) => {
    startInactividad(ctx, gotoFlow, TiempodeEspera); // ⬅️⬅️⬅️  INICIAMOS LA CUENTA ATRÁS PARA ESTE USUARIO
  })
  .addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;

    const sock = await provider.getInstance();
    await sock.sendPresenceUpdate("composing", id);
  })
  .addAnswer(bienvenidaText, { delay: 2000 })
  .addAnswer(
    mainoptionsText,
    {
      media: "https://zcontable.com/wp-content/uploads/2023/12/Mapa-zch-wp.jpg",
      capture: true,
    },
    async (ctx, { fallBack, gotoFlow, provider }) => {
      resetInactividad(ctx, gotoFlow, TiempodeEspera);
      console.log("Estamos en el flujo principal");
      const body = ctx.body;
      const sock = await provider.getInstance();
      const id = ctx.key.remoteJid;
      const validOptions = /^[0-7]$/;
      switch (body) {
        case "0":
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(fueradeServicioFlow);
        case validOptions.test(body) && body:
          stopInactividad(ctx);
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 3000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return gotoFlow(disponibleServicioFlow);
        default:
          await sock.sendPresenceUpdate("composing", id);
          await new Promise((resolve) =>
            setTimeout(async () => {
              await sock.sendPresenceUpdate("available", id);
              resolve();
            }, 2000)
          ); // ⬅️⬅️⬅️  ESPERA 2 SEGUNDOS PARA QUE SE ENVIE EL PRESENCE UPDATE
          return fallBack(novalidoptionText);
      }
    }
  );
