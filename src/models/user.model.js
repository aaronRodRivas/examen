const { DataTypes } = require('sequelize');
const sequelize = require("../mysql_connect/sequelize");

// User Model
const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
},{
  tableName: "users",
  timestamps: true
});

module.exports = { UserModel };