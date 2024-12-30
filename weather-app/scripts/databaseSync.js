require("dotenv").config()

const sequelize = require("../src/database/database");


require("../models/Status")
require("../models/Days")
require("../models/Records")

sequelize.sync({ alter: true }).then(() => {
    console.log("Tables synced.")
}).catch((error) => {
    console.error("Error syncing tables: ", error)
})