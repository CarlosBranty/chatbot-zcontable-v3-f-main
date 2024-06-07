const { createClient, connect } = require("../../clientpg");
const { stopInactividad } = require("../../idleCasero");
const { NumerosTelefonico } = require("./NumerosTelefonico");
const { addKeyword } = require("@bot-whatsapp/bot");

const client = createClient();
connect(client);
module.exports = addKeyword("##ZBOT_ENCENDIDO##")
  .addAction(async (ctx) => {
    try {
      // await connect(client);
      console.log("Intentando conectar a la base de datos en encender");
      // await connect(client);
      console.log("Conectado a la base de datos en encender");
      // Llamar a la stored procedure
      console.log("Ejecutando Stored procedure");
      const query = "CALL actualizar_estado($1, $2)";
      const values = [ctx.from, true];

      await client.query(query, values);

      console.log("Stored procedure ejecutada correctamente");

      console.log(
        `::::::::::::::::::EL BOT SE HA ACTIVADO PARA ${ctx.from}::::::::::::::::`
      );
    } catch (error) {
      console.error("Error al interactuar con la base de datos:", error);
    }
    // NumerosTelefonico[ctx.from] = {
    //   ...NumerosTelefonico[ctx.from],
    //   ecendido: true,
    // };
    console.log(
      `::::::::::::::::::EL BOT SE HA ACTIVADO PARA ${ctx.from}::::::::::::::::`
    );
  })
  .addAnswer("🥳 Bienvenido de Vuelta", null, async (ctx, { gotoFlow }) => {
    console.log(`REDIRECCIONANDO A ${ctx.from} AL MENU PRINCIPAL`);
    stopInactividad(ctx);
    return gotoFlow(require("../disponibleServicio.flow"));
  });
