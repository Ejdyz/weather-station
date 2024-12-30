/**
 * Import Sequelize.
 */
const { DataTypes } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const sequelize = require("../src/database/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Records = sequelize.define(
  "weather-records",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rain: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isRaining: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    light: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {}
);

module.exports = Records;
