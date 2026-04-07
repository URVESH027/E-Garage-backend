const mongoose = require("mongoose")
require("dotenv").config()
const ensureDefaultAdmin = require("./ensureDefaultAdmin")

const DBconnection = () => {

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected ")
    ensureDefaultAdmin().catch((e) => {
        console.log("Error ensuring default admin", e.message)
    })
}).catch((e) => {
    console.log(e)
})
 }
 module.exports = DBconnection
