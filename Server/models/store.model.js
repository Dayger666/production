const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Store = new Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    },
});


mongoose.model('Store', Store, 'Store');


