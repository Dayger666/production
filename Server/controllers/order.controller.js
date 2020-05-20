const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Spec = mongoose.model('Specification');
const Mat = mongoose.model('Materials');

async function findSpec(name) {
    let exists = await Spec.findOne({'name': name});
    return !!exists;
}


module.exports = {
    createOrder: async (plan, res) => {
        let order = await Spec.findOne({name: plan.name}).then((spec) => {
            return new Order({
                'name': plan.name,
                'steps':spec.steps,
                'amount': plan.amount,
                'idSpec': spec._id,
                'fullTime': spec.time * plan.amount
            });
        })
        await order.save((err, doc) => {
                if (!err) return res.status(200);
                else console.log(err);
            }
        );
    },
    getOrders: async (req, res) => {
        Order.find({}, (err, order) => {
            if (!err) return res.status(200).json(order);
            throw new Error(err);
        })
    },
    getMaterials: async (req, res) => {
        Mat.find({}, (err, materials) => {
            if (!err) return res.status(200).json(materials);
            throw new Error(err);
        })
    },
    planOrder: async (req, res) => {
        let amount;
        let options = {
            new: true,
            useFindAndModify: false
        }
        Order.findOneAndUpdate({_id: req.body.id}, {status: "запланирован"}, options)
            .then((order) => {
                amount = order.amount;
                return Spec.findOne({_id: order.idSpec})
            })
            .then((data) => {
                console.log(data);
                return Promise.all([
                    Mat.findOne({name: data.formType}, (err, doc) => {
                        let newAmount = doc.amount - amount
                        return Mat.findOneAndUpdate({name: data.formType}, {amount: newAmount}, options,(err, d) => {
                            if(err){
                                console.log(err)
                            }
                        })
                    }),
                    Mat.findOne({name: data.color}, (err, doc) => {
                        if(doc){
                            let newAmount = doc.amount - Math.ceil(data.paintQuantity * amount);
                            return Mat.findOneAndUpdate({name: data.color},
                                {amount: newAmount}, options, (err, d) => {
                                    if(err){
                                        console.log(err)
                                    }
                                })
                        }
                    }),
                    Mat.findOne({name: data.rod}, (err, doc) => {
                        if(doc){
                            let newAmount = doc.amount - amount
                            return Mat.findOneAndUpdate({name: data.rod}, {amount: newAmount}, options, (err, d) => {
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    }),
                ])
            })
            .then(() => res.status(200))
            .catch(err => console.log(err))
    },
    updateOrder: async (req, res) => {
        await Order.findOneAndUpdate({_id: req.body.id}, {status: req.body.status});
        return res.status(200);
    },
    updateOrderSteps: async (req, res) => {
        await Order.findOneAndUpdate({_id: req.body.id}, {steps: req.body.steps});
        return res.status(200);
    }
};


