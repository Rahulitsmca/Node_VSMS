var app;
(function (app) {
    var fs = require('fs');
    var appCrud = (function () {
        function appCrud() {
        }
        appCrud.prototype.GetRequestList = function (callback) {
            fs.readFile('./data/jsonData.json', function (err, data) {
                if (err) {
                    console.log("file not loaded");
                    throw err;
                }
                callback(JSON.parse(data));
            });
        };
        appCrud.prototype.AddRequest = function (callback, item) {
            var itemList = [];
            this.GetRequestList(function (data) {
                itemList = data;
                // adding item into ItemList
                itemList.push(item);
                //write file to persist data
                fs.writeFileSync('./data/jsonData.json', JSON.stringify(itemList));
                callback(itemList);
            });
        };
        appCrud.prototype.DeleteRequest = function (callback, index) {
            var itemList = [];
            this.GetRequestList(function (data) {
                itemList = data;
                // remove item into ItemList
                if (itemList.length > index)
                    itemList.splice(index, 1);
                //write file to persist data
                fs.writeFileSync('./data/jsonData.json', JSON.stringify(itemList));
                callback(itemList);
            });
        };
        return appCrud;
    })();
    app.appCrud = appCrud;
})(app || (app = {}));
module.exports = app.appCrud;
//# sourceMappingURL=appCrud.js.map