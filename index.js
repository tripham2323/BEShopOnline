const express = require('express');
const methodOverride = require("method-override");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.set("views", "./views");
app.set("view engine", "pug");

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// Route 
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});