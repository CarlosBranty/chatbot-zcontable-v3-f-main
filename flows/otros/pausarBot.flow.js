const { createClient, connect } = require("../../clientpg");
const { stopInactividad } = require("../../idleCasero");
const { NumerosTelefonico } = require("./NumerosTelefonico");

// let NumerosTelefonico = {}

const { addKeyword } = require("@bot-whatsapp/bot");

const tiempoApagado = 60000;

// module.exports = {
//     NumerosTelefonico
// }

const client = createClient();
connect(client);

module.exports = addKeyword("##BOT_APGADO_ENCENDIDO##").addAction(
  async (ctx, { endFlow }) => {
    try {
      // Llamar a la stored procedure
      console.log("Ejecutando Stored procedure");
      const query = "CALL actualizar_estado($1, $2)";
      const values = [ctx.from, false];

      await client.query(query, values);

      console.log("Stored procedure ejecutada correctamente");
      stopInactividad(ctx);

      return endFlow();
    } catch (error) {
      console.error("Error al interactuar con la base de datos:", error);

      return endFlow();
    }
    // NumerosTelefonico[ctx.from] = {
    //   ...NumerosTelefonico[ctx.from],
    //   ecendido: false,
    // };
    // console.log(NumerosTelefonico);
    // stopInactividad(ctx);
    // return endFlow();

    // setTimeout(() =>{
    //     NumerosTelefonico[ctx.from] = {...NumerosTelefonico[ctx.from], ecendido: true}
    //     console.log(`:::::::::::::::EL BOT SE HA ACTIVADO PARA ${ctx.from}::::::::::::::::::::`)
    // }, tiempoApagado)
  }
);
