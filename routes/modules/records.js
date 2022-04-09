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

//- 修改資料
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Record.findOne({ _id, userId })
    .populate("categoryId")
    .lean()
    .then((record) => {
      const selected = record.categoryId;
      Category.find({ _id: { $ne: record.categoryId } })
        .lean()
        .then((category) => {
          res.render("edit", { record, selected, category });
        });
    })
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  const editedRecord = req.body;
  const _id = req.params.id;
  const userId = req.user._id;
  return Record.findOne({ _id, userId })
    .then((record) => {
      record = Object.assign(record, editedRecord);
      return record.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//- 刪除資料
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
