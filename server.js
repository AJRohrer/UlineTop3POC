var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

/* serves main page */
app.get("/", function (req, res) {
    res.sendfile('index.html')
});

app.post("/user/add", function (req, res) {
    var top3Info = req.body;
    console.log(top3Info)

    var obj = new Object();
    obj = {
        Top3s : []
    };

    var json = JSON.stringify(obj);

    fs.readFile('./data/Top3List.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            obj.Top3s.push({ id: 2, square: 3 });
            json = JSON.stringify(obj);
            fs.writeFile('./data/Top3List.json', json, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("JSON successfully appended");
                }
            });
        }
    });
    res.send(json);
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
