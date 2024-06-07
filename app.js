const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const PostgreSQLAdapter = require("@bot-whatsapp/database/postgres");
const principalFlow = require("./flows/principal.flow");
const fueradeServicioFlow = require("./flows/fueradeServicio.flow");
const disponibleServicioFlow = require("./flows/disponibleServicio.flow");
const constitucionPrincipalFlow = require("./flows/constitucion/constitucionPrincipal.flow");
const servicioContablePrincipalFlow = require("./flows/contabilidad/servicioContablePrincipal.flow");
const asesoriaTributariaFlow = require("./flows/tributaria/asesoriaTributaria.flow");
const confirmaAsesoriatributariaFlow = require("./flows/tributaria/confirmaAsesoriatributaria.flow");
const asesoriaLegalPrincipalFlow = require("./flows/legal/asesoriaLegalPrincipal.flow");
const confirmaAsesorialegalFlow = require("./flows/legal/confirmaAsesorialegal.flow");
const auditoriaContablePrincipalFlow = require("./flows/auditoria/auditoriaContablePrincipal.flow");
const confirmaAuditoriacontableFlow = require("./flows/auditoria/confirmaAuditoriacontable.flow");
const direccionPrincipalFlow = require("./flows/otros/direccionPrincipal.flow");
const constitucionIndependienteFlow = require("./flows/constitucion/constitucionIndependiente.flow");
const confirmaConstitucionindependienteFlow = require("./flows/constitucion/confirmaConstitucionindependiente.flow");
const constitucionSocioContableFlow = require("./flows/constitucion/constitucionSocioContable.flow");
const elijesocioContablesecundarioFlow = require("./flows/constitucion/elijesocioContablesecundario.flow");
const plancontableSocioConstitucionFlow = require("./flows/constitucion/plancontableSocioConstitucion.flow");
const plancontableEmprendedorConstitucionFlow = require("./flows/constitucion/plancontableEmprendedorConstitucion.flow");
const planContablesocioFlow = require("./flows/contabilidad/planContablesocio.flow");
const confirmarPlansociocontableFlow = require("./flows/contabilidad/confirmarPlansociocontable.flow");
const planContableEmprendedorFlow = require("./flows/contabilidad/planContableEmprendedor.flow");
const confirmarPlanemprendedorcontableFlow = require("./flows/contabilidad/confirmarPlanemprendedorcontable.flow");
const pausarBotFlow = require("./flows/otros/pausarBot.flow");
const encenderBotFlow = require("./flows/otros/encenderBot.flow");
const { flowInactividad } = require("./idleCasero");
const asesorFlow = require("./flows/asesor.flow");
require("dotenv").config();

const main = async () => {
  const adapterDB = new PostgreSQLAdapter({
    host: process.env.POSTGRES_DB_HOST,
    user: process.env.POSTGRES_DB_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
  });
  const adapterFlow = createFlow([
    principalFlow,
    fueradeServicioFlow,
    disponibleServicioFlow,
    constitucionPrincipalFlow,
    servicioContablePrincipalFlow,
    asesoriaTributariaFlow,
    confirmaAsesoriatributariaFlow,
    asesoriaLegalPrincipalFlow,
    confirmaAsesorialegalFlow,
    auditoriaContablePrincipalFlow,
    confirmaAuditoriacontableFlow,
    direccionPrincipalFlow,
    constitucionIndependienteFlow,
    confirmaConstitucionindependienteFlow,
    constitucionSocioContableFlow,
    elijesocioContablesecundarioFlow,
    plancontableSocioConstitucionFlow,
    plancontableEmprendedorConstitucionFlow,
    planContablesocioFlow,
    confirmarPlansociocontableFlow,
    planContableEmprendedorFlow,
    confirmarPlanemprendedorcontableFlow,
    pausarBotFlow,
    encenderBotFlow,
    flowInactividad,
    asesorFlow,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
