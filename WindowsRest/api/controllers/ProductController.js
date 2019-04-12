const mongoose = require("mongoose");
const Product = require("../models/product");
exports.get_products = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select('name price _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    }

exports.post_products = (req, res, next) => {
        const product = new Product({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          price: req.body.price
        });
        product
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Created product successfully",
              createdProduct: {
                  name: result.name,
                  price: result.price,
                  _id: result._id,
                  request: {
                      type: 'GET',
                      url: "http://localhost:3000/products/" + result._id
                  }
              }
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }