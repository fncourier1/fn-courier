const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

require("./config/db");

const app = express();

app.set("view engine","ejs");

app.use(expressLayouts);
app.set("layout","layout");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.use(session({
  secret:"fn-secret",
  resave:false,
  saveUninitialized:true
}));

app.use("/", require("./routes/site"));
app.use("/", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

app.listen(3000, ()=> console.log("🚚 F&N Courier running at http://localhost:3000"));
