const express = require('express');

const productController = require("../controllers/productController")

const router = express.Router();

router.get('/', productController.product);
router.get('/product-cart', productController.productCart);
router.get('/product-detail', productController.productDetail);
router.get('/product-edit', productController.productEdit);
router.get('/product-create', productController.productCreate);

module.exports = router;