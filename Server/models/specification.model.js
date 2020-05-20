const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Specification = new Schema({
    name: {
        type: String,
    },
    idOrder: {
        type: String,
    },
    formType: {
        type: String,
    },
    steps:{
      type:Array,
    },
    rod: {
        type: String,
        default: null,
    },
    color: {
        type: String,
        default: null,
    },
    paintQuantity: {
        type: Number,
        default: null,
    },
    time: {
        type: Number,
    }
});


mongoose.model('Specification', Specification, 'Specifications');
