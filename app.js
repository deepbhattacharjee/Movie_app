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
            if(data["Response"]!=='True'){
                res.render('notfound');
            }else
            res.render('results',{data:data});
        }
    });
});

app.get("/movie/:imdbID", function(req, res){
    request("http://www.omdbapi.com/?i=" + req.params.imdbID + "&apikey=852159f0", function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("movie", {data: data});
        }
    });
});

app.listen("3000", function(){
    console.log("Server Has Started");
});
