var express = require('express')
    , app = express();
var request = require('request');
const EventEmitter = require('events');


const emitter = new EventEmitter();

app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use( bodyParser.text());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/socketio.html');
});
app.get('/events', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    emitter.on('message', (message) => {

            res.write('data: ' + message + '\n\n');
    })
//     setInterval(() => {
//         request('http://api.icndb.com/jokes/random', function (error, response, body) {
//             var joke = JSON.parse(body);
//             res.write('id: ' + joke.value.id + '\n');
//             res.write('event: ' + joke.type + '\n');
//             res.write('data: ' + JSON.stringify(joke.value.joke) + '\n\n');
//         });
//     }, 2000);
});

app.post('/message', (req, res) => {
   console.log(req.body);
    emitter.emit('message', req.body);

    res.end();
});


app.listen(3000, function () {
    console.log('listening on localhost:3000');
});
/**
 * Created by kkaczmarek on 23.11.2016.
 */
