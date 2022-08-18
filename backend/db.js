const mongoose = require('mongoose')

const connectToServer = async () => { mongoose.connect('mongodb://localhost:27017/eCommercedb', {useNewUrlParser: true}, () => console.log("Connected to Mongoose"))}

module.exports = connectToServer