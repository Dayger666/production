const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Materials = new Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
    },
    idDetail:{
        type: Number,
    }
});


mongoose.model('Materials', Materials, 'materials');


