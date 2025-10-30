const express = require("express");
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const moment = require("moment");
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

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 6000 } }));
app.use(flash());
// End Flash

// Tiny MCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));

// Route
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
