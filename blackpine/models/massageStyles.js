const mongoose = require('mongoose')
const Schema = mongoose.Schema

const massageStyleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("MassageStyle", massageStyleSchema)