var express = require('express')
    , app = express();
var request = require('request');
const EventEmitter = require('events');


const emitter = new EventEmitter();

app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use( bodyParser.text());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/events', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    let send = (message) => {
        res.write('data: ' + message + '\n\n');
    }

    emitter.on('message', send);

    res.on('close', () => {
        console.log('closing');
        emitter.removeEventListener('message', send);
    });
});

app.post('/message', (req, res) => {
   console.log(req.body);
    emitter.emit('message', req.body);

    res.end();
});


app.listen(3000, function () {

});
