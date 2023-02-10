const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {

    product: (req, res) => {
        res.render("./products/products", { products });
    },

    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productDetail: (req, res) => {
        const { id } = req.params;
        const product = products.find((product) => product.id == id)
        res.render("./products/productDetail", { product });
    },

    productEdit: (req, res) => {
        const productToEdit = products.find((product) => product.id == req.params.id)

        res.render("./products/productEdit", { productToEdit });
    },

    editedProduct: (req, res) => {
        
        let productToEdit = products.find((product) => product.id == req.params.id)
        productToEdit = {
            ...productToEdit,
            ...req.body,
            
        }
        const indexToEdit = products.findIndex((product) => product.id == req.params.id)
        products[indexToEdit] = productToEdit
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    productCreate: (req, res) => {
        res.render("./products/productCreate");
    },
    store: (req, res) => {
        const newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body
        }
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    deleteProduct: function(req, res){
        const productIndexFound = products.findIndex(function(product){
            return product.id == req.params.id;
        })
        
        if (productIndexFound > 0) {
            products.splice(productIndexFound, 1)
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')); 
        }
        res.redirect('/products');
}

}

module.exports = controller;



