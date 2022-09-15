const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");

//.........................................................

exports.requireController = (req, res, next) => {
  db.User.count({ where: { email: req.body.email } }).then((doc) => {
    if (doc != 0) {
      res.json("this email is already in use");
    } else {
      bcrypt.hash(req.body.password, 10).then((hashPassword) => {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
        })
          .then((doc) => {
            res.status(200).json({
              doc: doc,
              msg: `Hi ${doc.username}, you successfully registered`,
            });
          })
          .catch((err) => {
            res.status(400).json({ err: err, msg: "new user not created" });
          });
      });
    }
  });
};

exports.loginController = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (!user) {
      res.status(400).json({
        msg: "invalid email <but for safety reason should write invalid email and password>",
      });
    } else {
      bcrypt.compare(req.body.password, user.password).then((samePassword) => {
        if (samePassword) {
          let token = jwt.sign(
            { id: user.id, username: user.username, role: "user role" },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token: token });
        } else {
          res.status(400).json({
            msg: "invalid Password <but for safety reason should write invalid email and password>",
          });
        }
      });
    }
  });
};

exports.createUserController = (req, res, next) => {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((doc) => {
      res.status(200).json({ doc: doc, msg: "new user created" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "new user not created" });
    });
};

exports.findUserByIdController = (req, res, next) => {
  db.User.findOne({
    where: { id: req.params.id },
    include: [db.Product, db.Profile],
  })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " user by id found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "user by id  not found" });
    });
};

exports.findAllUserController = (req, res, next) => {
  db.User.findAll({ include: [db.Product] })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " users found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "users not found" });
    });
};

exports.updateUserController = (req, res, next) => {
  db.User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " user by id updated" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "user by id  not updated" });
    });
};

exports.deleteUserController = (req, res, next) => {
  db.User.destroy({ where: { id: req.params.id } })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " user by id deleted" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "user by id  not deleted" });
    });
};
