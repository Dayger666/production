require('./config/config');
require('./models/db-connection');
require('./config/passportConfig');
const mongoose = require('mongoose')
const passport = require('passport');

let http = require('http');
const router = require('./routes/router');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.Server(app);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        let valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.use('/api', router);

server.listen(process.env.PORT, () => {
    console.log(`Server has started on port: ${process.env.PORT}`);
});

// app.use(passport.initialize());


const Plan = mongoose.model('SalePlan');

const addOrders = async () => {
    let plan1 = new Plan({
        name: "Карандаш Big_белый",
        amount: 400,
        expTime: "2020-05-30",
    });
    let plan2 = new Plan({
        name: "Карандаш Big_красный",
        amount: 800,
        expTime: "2020-05-30",
    });
    let plan3 = new Plan({
        name: "Карандаш Big_чёрный",
        amount: 500,
        expTime: "2020-05-30",
    });
    let plan4 = new Plan({
        name: "Карандаш Small_чёрный",
        amount: 100,
        expTime: "2020-05-30",
    });
    let plan5 = new Plan({
        name: "Карандаш Small_красный",
        amount: 800,
        expTime: "2020-05-30",
    });
    let plan6 = new Plan({
        name: "Ручка Standard_L",
        amount: 800,
        expTime: "2020-05-30",
    });
    let plan7 = new Plan({
        name: "Ручка Standard_M",
        amount: 600,
        expTime: "2020-05-30",
    });
    let plan8 = new Plan({
        name: "Ручка High_L",
        amount: 100,
        expTime: "2020-05-30",
    });
    let plan9 = new Plan({
        name: "Ручка High_M",
        amount: 600,
        expTime: "2020-05-30",
    });
    let plan10 = new Plan({
        name: "Ручка Low_L",
        amount: 700,
        expTime: "2020-05-30",
    });

    await Plan.insertMany([plan1, plan2, plan3, plan4, plan5, plan6, plan7, plan8, plan9, plan10,], (err, doc) => {
        if(err) console.log("заполнение тест данными ошибка" ,err);
    });
}

addOrders();
const Mat = mongoose.model('Materials');

const addMaterials = async () => {
    let plan1 = new Mat({
        name: "Форма для ручек Standard",
        type: "форма для ручек",
        amount: 10000,
        idDetail: 1,
    });
    let plan2 = new Mat({
        name: "Форма для ручек High",
        type: "форма для ручек",
        amount: 10000,
        idDetail: 2,
    });
    let plan3 = new Mat({
        name: "Форма для ручек Low",
        type: "форма для ручек",
        amount: 10000,
        idDetail: 3,
    });
    let plan4 = new Mat({
        name: "Стежень L",
        type: "стержень",
        amount: 10000,
        idDetail: 4,
    });
    let plan5 = new Mat({
        name: "Стежень M",
        type: "стержень",
        amount: 10000,
        idDetail: 5,
    });
    let plan6 = new Mat({
        name: "Форма для карандашей Big",
        type: "форма для карандашей",
        amount: 10000,
        idDetail: 6,
    });
    let plan7 = new Mat({
        name: "Форма для карандашей Small",
        type: "форма для карандашей",
        amount: 10000,
        idDetail: 7,
    });
    let plan8 = new Mat({
        name: "Краска белая",
        type: "краска",
        amount: 10000,
        idDetail: 8,
    });
    let plan9 = new Mat({
        name: "Краска красная",
        type: "краска",
        amount: 10000,
        idDetail: 9,
    });
    let plan10 = new Mat({
        name: "Краска черная",
        type: "краска",
        amount: 10000,
        idDetail: 10,
    });

    await Mat.insertMany([plan1, plan2, plan3, plan4, plan5, plan6, plan7, plan8, plan9, plan10,], (err, doc) => {
        if(err) console.log("заполнение тест данными ошибка" ,err);
    });
}

addMaterials()