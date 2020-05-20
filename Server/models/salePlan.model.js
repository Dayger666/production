const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let salePlan = new Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
        lowercase: true,
    },
    expTime: {
        type: Date,
    },
});


mongoose.model('SalePlan', salePlan, 'salePlan');


