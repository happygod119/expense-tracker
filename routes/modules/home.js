const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const Record = require("../../models/record");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Category.find()
    .lean()
    .then((category) => {
      return Record.find({ userId })
        .populate("categoryId")
        .lean()
        .then((record) => {
          let totalAmount = 0;
          record.forEach((data) => (totalAmount += data.amount));
          res.render("index", { record, category, totalAmount });
        })
        .catch((err) => console.log(err));
    });
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const { displayCategoryId } = req.body;

  if (displayCategoryId) {
    Category.find({ _id: { $ne: displayCategoryId } })
      .lean()
      .then((notSelected) => {
        Category.findById(displayCategoryId)
          .lean()
          .then((displayCategory) => {
            return Record.find({ userId, categoryId: displayCategoryId })
              .populate("categoryId")
              .lean()
              .then((record) => {
                let totalAmount = 0;
                record.forEach((data) => (totalAmount += data.amount));
                res.render("index", {
                  record,
                  totalAmount,
                  displayCategory,
                  category: notSelected,
                });
              });
          });
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
