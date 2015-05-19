var app;
(function (app) {
    var Request = (function () {
        function Request(firstname, lastname, mobilenumber, vehiclenumber, address, pickupdate, returndate) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.mobilenumber = mobilenumber;
            this.vehiclenumber = vehiclenumber;
            this.address = address;
            this.pickupdate = pickupdate;
            this.returndate = returndate;
        }
        return Request;
    })();
    app.Request = Request;
})(app || (app = {}));
