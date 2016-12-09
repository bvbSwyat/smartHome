
module.exports = {
    randString: function(count) {
        var string = "";
        while (string.length < count && count > 0) {
            var r = Math.random();
            string += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return string;
    }


};
