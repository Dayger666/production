const mongoose = require('mongoose');

const Spec = mongoose.model('Specification');

async function findSpec(name){
    let exists = await Spec.findOne({'name': name});
    return !!exists;
}


module.exports = {
    getSpec: (req, res) => {
        Spec.find({}, (err, spec) => {
            if (!err) return res.status(200).json(spec);
            throw new Error(err);
        })
    },

    createSpec: async (req, res) => {
        const {id, name, formType, rod, color, paintQuantity, time,steps} = req.body;
        if (await findSpec(name)) {
            return res.status(422).send(['This specification already exists']);
        }
        let spec = new Spec({
            'idOrder': id,
            'name': name,
            'formType': formType,
            'steps':steps,
            'rod': rod,
            'color': color,
            'paintQuantity': paintQuantity,
            'time': time,
         });

        await spec.save((err, doc) => {
                if (!err) return res.send({
                    resultCode: 0,
                    specification: doc,
                });
                else console.log(err);
            }
        );
    },

    deleteSpec: async (req, res) => {
        await Spec.deleteOne({_id: req.body.id}, (err) => {
            if(err){
                console.log(err)
            }
        })
    }

};


