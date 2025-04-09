const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Sequelize/MySQL Connection Successful");
    await sequelize.sync();
    console.log("Sequelize/MySQL Sync Successful");
  } catch (error) {
    console.error("Sequelize/MySQL Connection Failed. " + error);
  }
}

initDB();

module.exports = sequelize;