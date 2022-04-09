if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 載入 mongoose
const mongoose = require("mongoose");
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI);

// 取得資料庫連線狀態
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

module.exports = db;
