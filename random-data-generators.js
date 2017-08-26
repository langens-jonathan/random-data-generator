var names = require('./names');
var quotes = require('./quotes');

module.exports = {
    /*
     returns a random date in the range [from-to]

     # Example Use
     ```
     getRandomDate(new Date("01-01-1017"), new Date());
     ```
    */
    getRandomDate: function(from, to) {
        from = from.getTime();
        to = to.getTime();
        return new Date(from + Math.random() * (to - from));
    },

    /*
     returns a random number in the range [low-high]

     # Example Use
     ```
     getRandomNumber(9, 99);
     ```
    */
    getRandomNumber: function (low, high) {
        return Math.floor((Math.random() * high) + 1) + low;
    },

    /*
     returns a random digit (0-9)

     # Example Use
     ```
     getRandomDigit();
     ```
    */
    getRandomDigit: function() {
        return this.getRandomNumber(0, 9);
    },

    /*
     returns a random telephone number

     # Example Use
     ```
     getRandomTel();
     ```
    */
    getRandomTel: function() {
        var prefixSize = Math.floor(Math.random() + 1) + 2;
        var tel = "";
        for(var i = 0; i < prefixSize; ++i){
            tel += this.getRandomDigit();
        }

        tel += "/";

        for(var i = 0; i < 3; ++i) {
            tel += this.getRandomDigit();
        }

        tel += ".";

        for(var i = 0; i < 3; ++i) {
            tel += this.getRandomDigit();
        }

        return tel;
    },

    /*
     returns a random quote.

     # Example Use
     ```
     getRandomQuote();
     ```
    */
    getRandomQuote: function() {
        var index = this.getRandomNumber(0, 168);
        return quotes.quotes[index];
    },

    /*
     returns a random person with the following attributes:
       * name
       * birthDate
       * email
       * tel

     # Example Use
     ```
     getRandomPerson();
     ```
    */
    getRandomPerson: function() {
        var index = this.getRandomNumber(0, 99);
        var name = names.names[index];
        var email = name.split(" ").join(".") + "@gmail.com";
        var birthDate = this.getRandomDate(new Date("01-01-1970"), new Date("12-31-1996"));
        var tel = this.getRandomTel();
        return {
            name: name,
            birthDate: birthDate,
            email: email,
            tel: tel
        }
    }
};
