/**
 * Import Sequelize.
 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const sequelize = require("@/database/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Days = sequelize.define(
  "weather-last-days",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    highestTemperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lowestTemperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    highestHumidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lowestHumidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wasRaining: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    highestRaining: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    highestLight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    highestPressure: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lowestPressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {}
);

module.exports = Days;
