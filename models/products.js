const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Products {
    constructor(product_name, price, amount,img_path ,category_name,description,id) {
        this.category_name = category_name;
        this.product_name = product_name;
        this.amount = amount;
        this.price = price;
        this.img_path = img_path;
        this.description = description;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product db.products.updateOne({_id: ObjectId(..)},{$set:{}});
            dbOp = db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product db.products.insertOne({"key1":val1,"key2":val2})
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')  // db.products.find({_id,ObjectId('...')})
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByDigital_Cameras() {
        const db = getDb();
        return db
            .collection('products')
            .find({category_name:"Digital Cameras"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByLenses() {
        const db = getDb();
        return db
            .collection('products')
            .find({category_name:"Lenses"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByFlashes() {
        const db = getDb();
        return db
            .collection('products')
            .find({category_name:"Flashes"})
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) }) // db.products.deleteOne({_id: ObjectID('...')})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Products;