var helpers = require('./sparql-helpers');
var generators = require('./random-data-generators.js');

/*
 This class serves as an example of what can be done with this data
 generator.

 The idea is that you can adapt and extent what is here. As everything is
 javascript everything is really modifyable.

 # class definitions
 The first part of this file contains the file definitions of the 2
 types in our world. As you can see quote is 'owned' by the person who made
 the quote. In javascript the object that we will save looks like:
 ```
var person = {
   name: "John Snow",
   email: "john.snow@winterfell.com",
   quotes: [
     {
       content: "I know nothing",
     }
   ]
 }
 ```
 This person (John) and its relations are correctly save to the triple store with
 a UUID so that the generated data can be used in a traditional mu.semte.ch applicaiton.

 # Random generated
 This module features several functions to randomly generate data. This can then
 together with the model be used to fill the triple store with (semi) random data to
 test or demo the application.
 */

/*
 Quote class definition
*/
var quoteClass = "http://example.com/Quote";
var quoteBase = "http://example.com/quotes/";
var quoteProperties = [
    {
        key: "content",
        predicate: "http://example.com/quote",
        type: {
            type: "string",
            options: {}
        }
    }
]

/*
 Person class definition
*/
var personClass = "http://example.com/Person";
var personBase = "http://exampl.com/persons/";
var personProperties = [
    {   key: "name",
        predicate: "http://xmlns.com/foaf/0.1/name",
        type: {
            type: "string",
            options: {}
        }
    },
    {
        key: "email",
        predicate: "http://xmlns.com/foaf/0.1/mbox",
        type: {
            type: "string",
            options: {}
        }
    },
    {
        key: "quotes",
        predicate: "http://example.com/madeQuote",
        type: {
            type: "relation",
            options: {
                relationClass: quoteClass,
                relationBase: quoteBase,
                relationProperties: quoteProperties
            }
        }
    }
];

/*
 Creating a random person and adding random quotes to it
*/
var person = generators.getRandomPerson();

person.quotes = [];
for(var i = 0; i < 3; ++i) {
    person.quotes.push({
        content: generators.getRandomQuote()
    });
}

console.log(helpers.writeObjectToStore(person, personClass, personBase, personProperties));
