const express = require("express");

const router = express.Router();
// const jwtHelper = require('../config/jwtHelper');
// const passport = require('passport');

const userController = require('../controllers/user.controller');
const salePlanController = require('../controllers/salePlan.controller');
const specController = require('../controllers/specification.controller');
const orderController = require('../controllers/order.controller');
const storeController = require('../controllers/store.controller');

router.post('/register', userController.register);
router.post('/login', userController.authenticate);

router.post('/createOrderFromPlan', salePlanController.createOrderFromPlan);
router.get('/getPlan', salePlanController.getPlan);

router.get('/getSpec', specController.getSpec);
router.post('/createSpec', specController.createSpec);
router.post('/deleteSpec', specController.deleteSpec);

router.get('/getOrders', orderController.getOrders);
router.get('/getMaterials', orderController.getMaterials);
router.post('/planOrder', orderController.planOrder);
router.post('/updateOrder', orderController.updateOrder);
router.post('/updateOrderSteps', orderController.updateOrderSteps);
router.post('/unloadToStore', storeController.unloadToStore);


// router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);


module.exports = router;
