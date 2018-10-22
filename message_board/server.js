var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/message_board");

const CommentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Comments musts have a name"]},
    comment: { type: String, required: [true, "Comments must have body"]},
}, {timestamps: true})

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Messages musts have a name"]},
    message: { type: String, required: [true, "Messages must have body"]},
    comments: [CommentSchema]
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);


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
    Message.find({}, function(err, messages) {
        if (err) {
            console.log("failure")
        }
        else {
            console.log("success")
        }
        res.render("index", {messages:messages})
    })
})

app.post("/message", function(req, res) {
    var message = new Message({name: req.body.name, message: req.body.message})
    message.save(function(err) {
        if (err) {
            console.log('something went wrong');
        }
        else {
            console.log('successfully added message');
        }
    })
    res.redirect("/")
})

app.post("/comment", function(req, res) {
    Comment.create(req.body, function(err, data) {
        if (err) {
            console.log("error creating comment");
        }
        else {
            Message.findOneAndUpdate({_id: req.body.id}, {$push: {messages: data}}, function(err, data) {
                if (err) {
                    console.log("failure!")
                }
                else {
                    console.log("success!")
                }
            })
        }
    })
    res.redirect("/")
})
app.listen(8000, function() {
    console.log("listening on port 8000");
})