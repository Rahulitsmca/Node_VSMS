module app {

    interface ICallback {
        (any): void;
    }
    var fs = require('fs');
    export class appCrud {
        GetRequestList(callback: ICallback) {
            fs.readFile('./data/jsonData.json', function (err, data) {
                if (err) {
                    console.log("file not loaded");
                    throw err;
                }
                callback(JSON.parse(data));
            });
        }

        AddRequest(callback: ICallback, item) {
            var itemList = [];
            this.GetRequestList(function (data) {
                itemList = data;
           
                // adding item into ItemList
                itemList.push(item);

                //write file to persist data
                fs.writeFileSync('./data/jsonData.json', JSON.stringify(itemList));
                callback(itemList);
            });
        }

        DeleteRequest(callback: ICallback, index) {
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
        }
    }
}

module.exports = app.appCrud;

