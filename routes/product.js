const express = require('express');

const productController = require("../controllers/productController")

const router = express.Router();

router.get('/', productController.product);

router.get('/product-cart', productController.productCart);

router.get('/product-detail/:id', productController.productDetail);

router.get('/product-edit/:id', productController.productEdit);
router.put('/:id', productController.editedProduct);

router.get('/product-create', productController.productCreate);
router.post('/', productController.store);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;