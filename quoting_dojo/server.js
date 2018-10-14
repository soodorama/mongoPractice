// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/quoting_dojo");
var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quote: {type: String, required: true, minlength: 10},
    date: {type: Date, required: true}
})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    res.render("index")
})
// Add User Request 
app.post('/quotes', function(req, res) {
    var date = new Date();
    var quote = new Quote({name: req.body.name, quote: req.body.quote, date: date.getDate()});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a quote!');
        }
    })
    Quote.find({}, function(err, quotes) {
        if (err) {
            console.log("Error retrieving data from Mongoose");
        }
        else {
            console.log("Successfully got data from Mongoose");
        }
        res.render("quotes",{quotes:quotes});
    })
})

app.get("/quotes", function(req, res) {
    Quote.find({}, function(err, quotes) {
        if (err) {
            console.log("Error retrieving data from Mongoose");
        }
        else {
            console.log("Successfully got data from Mongoose");
        }
        res.render("quotes",{quotes:quotes});
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
