const mongoose = require('mongoose');

const Store = mongoose.model('Store');
const Order = mongoose.model('Order');
const Plan = mongoose.model('SalePlan');

module.exports = {

    unloadToStore: async (req, res) => {
        let store = new Store({
            name: req.body.name,
            amount: req.body.amount,
        })
        await Order.deleteOne({_id: req.body.id});
        await Plan.deleteOne({name: req.body.name});

        await store.save()
    }


}