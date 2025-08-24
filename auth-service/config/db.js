// Connection to PostgreSQL with support for DATABASE_URL (Render) and SSL
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Prefer single connection string if provided (e.g., from Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      // Enable SSL by default for hosted databases; can be disabled via DB_SSL=false
      ssl: process.env.DB_SSL === "false" ? false : { require: true, rejectUnauthorized: false },
    },
  });
} else {
  // Fallback to individual env vars (local/dev)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );
}

try {
  await sequelize.authenticate();
  console.log("PostgreSQL Connected");
} catch (error) {
  console.error("DB Connection Error:", error);
}

export default sequelize;