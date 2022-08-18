const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        default: 'Unbranded'
    },
    company: {
        type: String,
        default: 'Generic'
    },
    addedOn: {
        type: Date
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product