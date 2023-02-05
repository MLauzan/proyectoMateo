const express = require('express');

const mainController = require("../controllers/mainController")

const router = express.Router();


router.get('/', mainController.index);
router.get('/product-cart', mainController.productCart);
router.get('/product-detail', mainController.productDetail);
router.get('/product-edit', mainController.productEdit);
router.get('/product-create', mainController.productCreate);


module.exports = router;
