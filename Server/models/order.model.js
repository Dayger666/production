const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    name: {
        type: String,
    },
    idSpec: {
      type: String,
    },
    status: {
        type: String,
        lowercase: true,
        default: "создан"
    },
    steps:{
      type:Array,
    },
    amount: {
        type: Number,
    },
    fullTime: {
        type: Number,
    }
});


mongoose.model('Order', Order, 'Order');


