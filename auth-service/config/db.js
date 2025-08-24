//connection to postgre

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", //Specifies PostgreSQL as the database type.
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log(" PostgreSQL Connected");
} catch (error) {
  console.error(" DB Connection Error:", error);
}

export default sequelize;
