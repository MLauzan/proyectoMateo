const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {

    product: (req,res) => {
        res.render("./products/products", {products});
    },

    productCart: (req,res) => {
        res.render("./products/productCart");
    },
    productDetail: (req,res) => {
        res.render("./products/productDetail");
    },
    productEdit: (req,res) => {
        res.render("./products/productEdit");
    },
    productCreate: (req,res) => {
        res.render("./products/productCreate");
    },

}

module.exports = controller;



