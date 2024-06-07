const { Pool } = require("pg");
require("dotenv").config();

const createClient = () => {
  return new Pool({
    host: process.env.POSTGRES_DB_HOST,
    user: process.env.POSTGRES_DB_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
  });
};

const disconnect = async (client) => {
  // Verificar si el cliente ya está desconectado

  await client.end();
  console.log("cerrando conexion Master");
};

const connect = async (client) => {
  // Conectar el cliente
  await client.connect();
  console.log("conectando conexion Master");
};

module.exports = {
  createClient,
  connect,
  disconnect,
};
