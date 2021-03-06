var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var pathFile=process.env.NODE_ENV.trim() == "production"?"dist":"dev";
var index = require("./"+pathFile+"/routes/index");
var login = require("./"+pathFile+"/routes/login");
var file = require("./"+pathFile+"/routes/file");
var article=require("./"+pathFile+"/routes/article");
var user=require("./"+pathFile+"/routes/user");
var articleType=require("./"+pathFile+"/routes/articleType");
var demo = require("./"+pathFile+"/routes/demo");
// handlebars module
var handlebars=require("express3-handlebars");
var express_handlebars_sections = require("express-handlebars-sections");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "./"+pathFile+"/app/src/views"));
app.engine("hbs", handlebars({
    layoutsDir: "./"+pathFile+"/app/src/views",
    defaultLayout: "layout",
    extname: ".hbs",
    partialsDir:__dirname + pathFile+"/app/src/views/template/",
    helpers:{
        section: express_handlebars_sections()
    }
}));
app.set("jwtTokenSecret", "SECRET_TOKEN");
app.set("view engine", "hbs");

app.use(favicon(path.join(__dirname, pathFile+"/app", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, pathFile+"/app")));

app.use("/login", login);
app.use("/article", article);
app.use("/articleAdd", article);
app.use("/articleType", articleType);
app.use("/typeData", articleType);
app.use("/uploadFile", file);
app.use("/", index);
app.use("/blog", index);
app.use("/blogMore", index);
app.use("/home", index);
app.use("/demo", demo);
app.use("/demos", index);
app.use("/about", index);
app.use("/blogDeatil", index);
app.use("/file", file);
app.use("/user", user);

/*检查路由是否存在*/
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    res.render("error/404",{layout:null});
});

/*检测是否出错*/
app.use(function(err, req, res, next) {
    "use strict";
    var status=err.status;
    if(status=="401"){ /*没有认证*/
        res.status(status);
        res.render("login/login",{layout:null});
    }
    else{
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(status || 500);
        res.render("error/error",{layout:null,msg:err.message});
    }
});
app.listen(3000);

process.on("uncaughtException", function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

module.exports = app;
