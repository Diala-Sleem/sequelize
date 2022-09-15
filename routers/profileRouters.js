const route = require("express").Router();

const db = require("../models");

route.post("/createprofile", (req, res, next) => {
  db.Profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
    UserId: req.body.UserId,
  })
    .then((doc) => {
      res.status(200).json({ doc: doc, msg: "new Profile created" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "new Profile not created" });
    });
});

route.get("/profile/:id", (req, res, next) => {
  db.Profile.findOne({
    where: { id: req.params.id },
    include: [db.User],
  })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " Profile by id found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "Profile by id  not found" });
    });
});

route.get("/profiles", (req, res, next) => {
  db.Profile.findAll({ include: [db.User] })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " products found" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "products not found" });
    });
});

route.patch("/profileupdate/:id", (req, res, next) => {
  db.Profile.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
    },
    { where: { id: req.params.id } }
  )

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " Profile by id updated" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "Profile by id  not updated" });
    });
});

route.delete("/profiledelete/:id", (req, res, next) => {
  db.Profile.destroy({ where: { id: req.params.id } })

    .then((doc) => {
      res.status(200).json({ doc: doc, msg: " Profile by id deleted" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "Profile by id  not deleted" });
    });
});

module.exports = route;
