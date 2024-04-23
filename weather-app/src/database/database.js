const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectModule: require('mysql2'),
  logging: false,
  timezone: '+02:00',
  dialectOptions: {
    useUTC: false, //for reading from database
    timezone: '+00:00'
  },
});

module.exports = sequelize;