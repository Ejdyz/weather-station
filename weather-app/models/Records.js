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
const Records = sequelize.define(
  "weather-records",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    numberInDay: {
      type: DataTypes.TINYINT,
      unsigned: true,
      allowNull: false,
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

module.exports = Records;
