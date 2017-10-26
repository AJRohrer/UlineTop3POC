var express = require("express");
var app = express();
var bodyParser = require('body-parser');

/* serves main page */
app.get("/", function (req, res) {
    res.sendfile('index.html')
});

app.post("/user/add", function (req, res) {
    var top3Info = req.body.data;
    console.log(top3Info)
    res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + req.params[0]);
});

var port = process.env.PORT || 1337;
app.listen(port, function () {
    console.log("Listening on " + port);
});
