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
      allowNull: true,
    },
    lowestTemperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    highestHumidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lowestHumidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wasRaining: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    highestRaining: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    highestLight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    highestPressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lowestPressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {}
);

module.exports = Days;
