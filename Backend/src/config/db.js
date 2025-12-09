const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD.replace(/^"|"$/g, ""), // remove quotes if any
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected!");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
