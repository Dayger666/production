const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true },err => {
    if(err){
        console.log(err);
    } else {
        console.log('Succefully connected to database');
    }
});

require('./user.model');
require('./specification.model');
require('./salePlan.model');
require('./order.model');
require('./materials.model');
require('./store.model');