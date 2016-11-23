var express = require('express')
    , app = express();
var request = require('request');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/intro.html');
});

app.get('/events', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    setInterval(() => {
        request('http://api.icndb.com/jokes/random', function(error, response, body) {
            var joke = JSON.parse(body);
            res.write('id: '+joke.value.id+'\n');
            // res.write('event: '+joke.type+'\n');
            res.write('data: ' + JSON.stringify(joke.value.joke) + '\n\n');
        });
    }, 2000);
});

app.listen(3000, function() {
    console.log('listening on localhost:3000');
});