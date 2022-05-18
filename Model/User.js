const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String
})



module.exports = mongoose.model("User", userSchema)