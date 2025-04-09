const express = require("express");
const cors = require("cors");
const api = express();

process.loadEnvFile(); // carga .env

process.env.SEQUELIZE === "yes" 
  ? require("./mysql_connect/sequelize")
  : require("./mysql_connect/mysql2");

// routes loading
const apiRandom = require("./routes/apirandom.routes");
const auth = require("./routes/auth.routes");
const task = require("./routes/task.routes");

// config middlewares
api.use(cors());
api.use(express.json());
api.use("/api/v1", apiRandom, auth,task);

const PORT = process.env.PORT || 3000; // para deploy
api.listen(PORT, ()=> console.log(`API Listening in port: ${PORT}`));