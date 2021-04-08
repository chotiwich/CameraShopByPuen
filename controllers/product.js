const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const Cart = require("../models/carts");
const ObjectId = mongodb.ObjectId;



exports.index = (req, res, next) => {
    res.render('index', {
        pageTitle: '',
    });
}

exports.shopPage = (req, res, next) => {
    res.render('products/shop', {
        pageTitle: '',
    });
}
exports.insert = (req, res, next) => {
    res.render('products/insert', {
        pageTitle: '',
    });
}

exports.showCart = (req, res, next) => {
    Cart.fetchAll()
      .then((carts) => {
        res.render("products/shoppingCart", {
          pageTitle: "Cart",
          product_cart: carts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/shop', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProduct1 = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/search', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const price = '';
    const amount = '';
    const category_name = '';
    const img_path = '';
    const description = '';
    res.render('insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_name: product_name,
        price: price,
        amount:amount,
        category_name:category_name,
        img_path:img_path,
        description:description
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { product_name,price,amount,img_path,category_name,description} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            price: price,
            amount:amount,
            category_name:category_name,
            img_path:img_path,
            description:description

        });
    }

    const product = new Product(product_name,price,amount,img_path,category_name,description);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/shop');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let amount = '';
    let category_name ='';
    let img_path ='';
    let description='';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            amount = product.amount;
            category_name = product.category_name;
            img_path = product.img_path;
            description = product.description;
            res.render('products/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                amount: amount,
                category_name: category_name,
                img_path: img_path,
                description: description
            });
        })
        .catch(err => console.log(err));
};

exports.getdetailProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let amount = '';
    let category_name ='';
    let img_path ='';
    let description='';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            amount = product.amount;
            category_name = product.category_name;
            img_path = product.img_path;
            description = product.description;
            res.render('products/detail', {
                pageTitle: 'Detail Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                amount: amount,
                category_name: category_name,
                img_path: img_path,
                description: description
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, product_name, price , amount , category_name , img_path , description  } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('/update', {
            pageTitle: 'Update Product',
            errorMessage: errors.array(),
            product_id: product_id,
            product_name: product_name,
            price: price,
            amount: amount,
            category_name: category_name,
            img_path: img_path,
            description: description
        });
    }

    const product = new Product(product_name,price,amount,img_path,category_name,description, new ObjectId(product_id));
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.deleteProductCart = (req, res, next) => {
    const { name } = req.params;
    Cart.deleteByName(name)
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));
  };

exports.getSearchProductByLenses = (req, res, next) => {

    Product.fetchAllByLenses()
        .then(products => { 
            res.render('products/Lenses', {
                pageTitle: 'Search Lenses',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProductByFlashes = (req, res, next) => {

    Product.fetchAllByFlashes()
        .then(products => { 
            res.render('products/Flashes', {
                pageTitle: 'Search Flashes',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProductByDigital_Cameras = (req, res, next) => {

    Product.fetchAllByDigital_Cameras()
        .then(products => { 
            res.render('products/Digital_Cameras', {
                pageTitle: 'Search Digital Cameras',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.addToCart = (req, res, next) => {
    const { add_to_cart, amount } = req.body;
    Product.findByName(add_to_cart).then((product) => {
      product_name = product.product_name;
      price = product.price;
      path = product.path;
      const cart = new Cart(product_name, price, amount, path);
      cart
        .save()
        .then((result) => {
          res.redirect("/products");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };