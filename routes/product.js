const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const productsController = require('../controllers/product');
const cartsController = require('../controllers/cart');

router.get('/', productsController.index);

// router.get('/shop', productsController.shopPage);

router.get('/insert', productsController.insert);

router.get('/shop', productsController.getSearchProduct);

router.get('/Lenses', productsController.getSearchProductByLenses);

router.get('/Flashes', productsController.getSearchProductByFlashes);

router.get('/Digital_Cameras', productsController.getSearchProductByDigital_Cameras);

router.get('/cart', cartsController.getCart);

router.get('/products', productsController.getSearchProduct1);

// router.get('/insert', productsController.getAddProduct);

router.get('/products/update/:product_id', productsController.getUpdateProduct);

router.get('/products/detail/:product_id', productsController.getdetailProduct);

// /admin/add-product => POST
router.post('/insert', [
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postAddProduct);

router.post('/products/update', [
    check('product_id').not().isEmpty().withMessage("empty"),
    check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postUpdateProduct);

router.post('/addcart', [
    check('product_id').trim().not().isEmpty().withMessage("product name is required"),
], cartsController.postAddCart);

router.get('/products/delete/:product_id', productsController.getDeleteProduct);
router.get('/cart/delete/:cart_id', cartsController.getDeleteCart);

exports.routes = router;