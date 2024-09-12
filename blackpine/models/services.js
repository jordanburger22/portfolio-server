const mongoose = require('mongoose')
const Schema = mongoose.Schema

const servicesSchema = new Schema({
    
    serviceType: String,
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    serviceImg: {
        type: String
    },
    serviceBannerImg: {
        type: String
    }
    

})

module.exports = mongoose.model("Service", servicesSchema)