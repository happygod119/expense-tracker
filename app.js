const express = require("express"); // 載入Express


const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

// 設定port
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});