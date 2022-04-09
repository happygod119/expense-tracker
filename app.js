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
const usePassport = require("./config/passport"); // 載入設定檔
require("./config/mongoose"); // 引用mongoose;

const app = express();
const PORT = process.env.PORT;

//設定使用handlebars
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public")); //使用public設定
app.use(bodyParser.urlencoded({ extended: true })); // 使用body-parser
app.use(methodOverride("_method")); // 使用methodOverride

usePassport(app); // 呼叫 Passport 
app.use(flash()); // connect-flash
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  res.locals.warning_msg = req.flash("loginerr_msg"); // 設定 loginerr_msg 訊息
  next();
});

app.use(routes); // 將 request 導入路由器

// 設定port
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
