const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    product: String,
    quantity: Number,
    price: Number,
    date: Date
}, {versionKey: false});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
