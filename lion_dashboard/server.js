var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
app.use(express.static(path.join(__dirname, './static')));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/lion_dashboard");
var LionSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    img: {type: String, required: true},
    age: {type: Number, required: true}
})
mongoose.model('Lion', LionSchema);
var Lion = mongoose.model('Lion')

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    Lion.find({}, function(err, lions) {
        if (err) {
            console.log("Error retrieving data from Mongoose");
        }
        else {
            console.log("Successfully got data from Mongoose");
        }
        res.render("index",{lions:lions});
    })
})

app.get('/lions/:id', function (req, res) {
    Lion.find({id:req.body.id}, function(err, lion) {
        if (err) {
            console.log("Error retrieving data from Mongoose");
        }
        else {
            console.log("Successfully got data from Mongoose");
            res.render("lions/:id", {lion:lion})
        }
    })
})

app.get('/lions/new', function(req, res) {
    res.render("new")
})

app.post('/', function(req, res) {
    var lion = new Lion({name: req.body.name, quote: req.body.img, age: req.body.age});
    lion.save(function(err) {
        if(err) {
            console.log('something went wrong');
        } else { 
            console.log('successfully added a lion!');
        }
    })
    Lion.find({}, function(err, lions) {
        if (err) {
            console.log("Error retrieving data from Mongoose");
        }
        else {
            console.log("Successfully got data from Mongoose");
        }
        res.render("index",{lions:lions});
    })
})

app.get('/lions/edit/:id', function(req, res) {

})