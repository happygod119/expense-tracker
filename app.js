const express = require("express"); // 載入Express
const exphbs = require("express-handlebars"); // 載入handlebars

const routes = require("./routes"); // 引用路由器
require("./config/mongoose"); // 引用mongoose;

const app = express();
const PORT = 3000;

//設定使用handlebars
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(routes); // 將 request 導入路由器

// 設定port
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
