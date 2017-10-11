# mu.semte.ch random data generators

Need lots of random data to test your application or to demo your application? Don't fear, the mu.semte.ch random data generators are here.

The idea behind this library is simple; you get some methods that will generate random data and objects for you.
You can add your own but at some point you end up with everything you want in the triple store in memory in this
small node application. 

Then this library can be used to transform those javascript objects to triples in your triple store.

## Getting your javascript objects in SPARQL
We use small transform property objects to describe which keys to serialize and how. For instance suppose we have the following object:
```
var john = {
  name: "John Snow",
  home: "Winterfell"
}
```
And a properties object such as this:
```
var personProperties = [
{   key: "name",
        predicate: "http://xmlns.com/foaf/0.1/name",
        type: {
            type: "string",
            options: {}
        }
    }
]
```

Then John will by correctly transformed to SPARQL by this library.

## Generating Random Data
The library features several helper methods that generate random data and objects.
```
var randomPerson = generators.getRandomPerson();
var randomTel = generators.getRandomTel();
var randomDate = generators.getRandomDate(new Date("01-01-1970"), new Date());
...
```

These methods can then be used to construct your objects after this you call the writeObjectToStore method, sit back and relax.

## Installation
Just clone this repository and run
```
npm install
```
and you are good to go! After that modify generate.js at will and run:
```
node generate.js
```
to fill your triple store with your random data.

## API
### More elaborate example
Suppose there are 2 types in our world, Person and Quote. 
As you can see quote is 'owned' by the person who made
the quote. In javascript the object that we will save looks like this, where John owns
two quotes, one which will be newly created, and an existing one whose id and uri were
returned by a previous query:
```
var person = {
   name: "John Snow",
   email: "john.snow@winterfell.com",
   quotes: [
     {
       content: "I know nothing"
     },
     {
       id: "71f3c84a-9207-4eec-88ae-53cc5296bf07",
       uri: "http://example.com/quote/71f3c84a-9207-4eec-88ae-53cc5296bf07"
     }
   ]
 }
 ```
 We then define the model for quote as follows:
 ```
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
```

The model for person is a bit more complicated, not only because it has more properties but also because it owns a relationship:
```
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
```
now remember John? Well if we want to store him in the triple store we just call:
```
writeObjectToStore(john, personClass, personBase, personProperties);
```
Then John will be triplified, easy peasy!

John and his relations are correctly save to the triple store with
a UUID so that the generated data can be used in a traditional mu.semte.ch applicaiton.
 
### modules
There are 2 modules in this library and they are included in the generate.js file as follows:
```
var helpers = require('./sparql-helpers');
var generators = require('./random-data-generators.js');
```
Any of the generator methods can be called by prepending it with "generators.".

### random data generators API
#### getRandomDate(from, to)
returns a random date in the range [from-to]

###### Example Use
```
getRandomDate(new Date("01-01-1017"), new Date());
```
#### getRandomNumber(low, high)
returns a random number in the range [low-high]

###### Example Use
```
getRandomNumber(9, 99);
```
#### getRandomDigit()
returns a random digit (0-9)

###### Example Use
```
getRandomDigit();
```
#### getRandomTel()
returns a random telephone number

###### Example Use
```
getRandomTel();
```
#### getRandomQuote()
returns a random quote.

###### Example Use
```
getRandomQuote();
```
#### getRandomPerson()
returns a random person with the following attributes:
   * name
   * birthDate
   * email
   * tel

 ###### Example Use
```
getRandomPerson();
```
### sparql helpers API
#### writeObjectToStore(data, resourceClass, resourceBase, properties)
Takes an javascript object (hash) and uses the resourceClass, resourceBase and properties
to turn that object into a query that can be written to the triple store.

Then the functions returns a hash with the UUID and the URI for the newly created object
(this is important for creating relations).

##### Example Use
```
var data = {
  name: "John Snow",
  birthDate: new Date("01-01-1995")
};
var resourceClass = "http://game-of-thrones.com/types/Character";
var resourceBase = "http://game-of-thrones.com/characters/";
var properties = [
{
  key: "name",
  predicate: "http://xmlns.com/foaf/0.1/name",
  type: {
    type: "string",
    options: {}
  }
},
{
  key: "birthDate",
  predicate: "http://mu.semte.ch/vocabularies/ext/birthDate",
  type: {
    type: "date",
    options: {}
  }
}];
writeObjectToStore(data, resourceClass, resourceBase, properties);
```
The result of this call will put John Snow in the triple store, with the type character, a mu uuid and the passed properties.
The return value will be a hash containing the URI and the UUID for John Snow.
