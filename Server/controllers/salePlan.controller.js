const mongoose = require('mongoose');

const Plan = mongoose.model('SalePlan');

const orderController = require("./order.controller")

module.exports = {
    getPlan: async = (req, res) => {
        Plan.find({}, (err, plan) => {
            if (!err) return res.status(200).json(plan);
            throw new Error(err);
        })
    },
    // deleteOrdersFromPlan: async = (req, res) => {
    //     let errObj = {};
    //     req.body.forEach(id => {
    //         Plan.findOneAndDelete({_id: id}, (err, plan) => {
    //             if(err) errObj.push(plan);
    //         })
    //     }).then(() => {res.status(200).send("Данные заказы перенесы в раздел сборки")} )
    // }

    createOrderFromPlan: async = (req, res) => {
        Plan.findOne({_id: req.body.id}, (err, plan) => {
            return orderController.createOrder(plan, res);
        })
    }
};


