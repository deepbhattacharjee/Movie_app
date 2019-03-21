var express = require('express')
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('landing');
});

app.get('/results', function(req,res){
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s='+query+'&apikey=Your omdb api key';
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            res.render('results',{data:data});
        }
    });
});

app.listen("3000", function(){
    console.log("Server Has Started");
});
