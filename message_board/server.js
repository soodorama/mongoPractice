var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/message_board");
// var QuoteSchema = new mongoose.Schema({
//     name: {type: String, required: true, minlength: 3},
//     quote: {type: String, required: true, minlength: 10},
//     date: {type: Date, required: true}
// })
// mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
// var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index")
})

// app.post('/quotes', function(req, res) {
//     var date = new Date();
//     var quote = new Quote({name: req.body.name, quote: req.body.quote, date: date.getDate()});
//     // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
//     quote.save(function(err) {
//         // if there is an error console.log that something went wrong!
//         if(err) {
//             console.log('something went wrong');
//         } else { // else console.log that we did well and then redirect to the root route
//             console.log('successfully added a quote!');
//         }
//     })
//     Quote.find({}, function(err, quotes) {
//         if (err) {
//             console.log("Error retrieving data from Mongoose");
//         }
//         else {
//             console.log("Successfully got data from Mongoose");
//         }
//         res.render("quotes",{quotes:quotes});
//     })
// })

app.listen(8000, function() {
    console.log("listening on port 8000");
})