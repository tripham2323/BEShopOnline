const express = require("express");
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const bodyParser = require("body-parser");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 6000 } }));
app.use(flash());
// End Flash

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// Route
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
