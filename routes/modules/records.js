const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const Record = require("../../models/record");

//- 新增資料
router.get("/new", (req, res) => {
  return Category.find()
    .lean()
    .then((category) => {
      res.render("new", { category });
    })
    .catch((err) => console.log(err));
});
router.post("/", (req, res) => {
  const record = req.body;
  record.userId = req.user._id;
  return Record.create(record)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;