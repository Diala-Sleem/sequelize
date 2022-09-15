const route = require("express").Router();

const db = require("../models");

route.post("/createproduct", (req, res, next) => {
  db.Product.create({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    price: req.body.price,
    UserId: req.body.UserId,
  })
    .then((doc) => {
      res.status(200).json({ doc: doc, msg: "new product created" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "new product not created" });
    });
});

route.get("/product/:id", (req, res, next) => {
  db.Product.findOne({ where: { id: req.params.id },include:[db.User] })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " product by id found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "product by id  not found" });
    });
});

route.get("/products", (req, res, next) => {
  db.Product.findAll({include:[db.User]})

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " products found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "products not found" });
    });
});

route.patch("/productupdate/:id", (req, res, next) => {
  db.Product.update(
    {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      price: req.body.price,
      UserId: req.body.UserId,
    },
    { where: { id: req.params.id } }
  )

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " product by id updated" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "product by id  not updated" });
    });
});

route.delete("/productdelete/:id", (req, res, next) => {
  db.Product.destroy({ where: { id: req.params.id } })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " product by id deleted" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "product by id  not deleted" });
    });
});

module.exports = route;
