var express = require('express');
var appCrud = require('./appCrud');
var fs = require('fs');
var http = require('http');
var path = require('path');
var domain = require('domain');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
var error_domain = domain.create();
error_domain.on('error', function (err) {
    console.log(err);
});
error_domain.run(function () {
    var p = new appCrud();
    app.get('/service', function (req, res) {
        //read json from file 
        p.GetRequestList(function (data) {
            res.json(data);
        });
    });
    app.post('/service', function (req, res) {
        var formData = { "firstname": req.body.firstname, "lastname": req.body.lastname, "mobilenumber": req.body.mobilenumber, "vehiclenumber": req.body.vehiclenumber, "address": req.body.address, "pickupdate": req.body.pickupdate, "returndate": req.body.returndate };
        //add item in file 
        p.AddRequest(function (data) {
            res.json(data);
        }, formData);
    });
    app.del('/service/:_id', function (req, res) {
        //delete item in file 
        p.DeleteRequest(function (data) {
            res.json(data);
        }, req.params._id);
    });
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
//# sourceMappingURL=app.js.map