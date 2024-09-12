const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessInfoSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    businessFacebookUrl: String,
    personalFacebookUrl: String,
    instagramUrl: String,
    subHeader: String
})



module.exports = mongoose.model("BusinessInfo", businessInfoSchema)