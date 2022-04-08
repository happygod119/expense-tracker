const express = require("express"); // 載入Express
const session = require("express-session"); // 載入express-session
const exphbs = require("express-handlebars"); // 載入handlebars
const bodyParser = require("body-parser"); // 載入body-parser
const methodOverride = require("method-override"); //載入method-override
const flash = require("connect-flash"); // 引用 connect-flash
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes"); // 引用路由器
require("./config/mongoose"); // 引用mongoose;

const app = express();
const PORT = 3000;

//設定使用handlebars
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true })); // 使用body-parser
app.use(methodOverride("_method")); // 使用methodOverride

app.use(routes); // 將 request 導入路由器

// 設定port
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
