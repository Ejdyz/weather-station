/**
 * Import Sequelize.
 */
const { DataTypes } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const sequelize = require("@/database/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Status = sequelize.define(
  "weather-status",
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
      allowNull: false,
    },
    isRaining: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pressure: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    light: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

module.exports = Status;
