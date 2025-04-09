// Una ORM (Object Relational Mapping), es una técnica que permite interactuar con una base de datos utilizando objectos en vez de escribir consultas SQL directamente. Convierte las tablas en Clases y las filas en instancias de esas clases.
const { DataTypes } = require('sequelize');
const sequelize = require("../mysql_connect/sequelize");

// Modelo Tareas
const TareasModel = sequelize.define("Tareas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
},{
  tableName: "tareas",
  timestamps: true
});


module.exports = { TareasModel };

/*
mysql://root:TmnucSERGsZFYLhLzpxJSLWkGyHqUQiG@tramway.proxy.rlwy.net:48533/railway

…or create a new repository on the command line
echo "# examen_api" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/aaronRodRivas/examen_api.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/aaronRodRivas/examen_api.git
git branch -M main
git push -u origin main



*/