var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/books_api_app');
mongoose.model("Books", new Schema({"copyright" : String, "book_title" : String}));
var Book = mongoose.model("Books");

app.get("/book", function(req,res){
    Book.find({}, function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});

app.post("/book", function(req,res){
    console.log(req.body);

    var addedBook = new Movie({"copyright" : req.body.copyright, "book_title" : req.body.book_title, "Rated" : req.body.Rated, "Actors" : req.body.Actors, "Plot": req.body.Plot});
    addedBook.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });


});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening");
});

module.exports = app;
