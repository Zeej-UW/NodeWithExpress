import express from 'express';
import { things } from './routes/things.js'
import { test }from './routes/test.js'
import { home, __dirname }from './routes/home.js'
import cookieParser from 'cookie-parser';

var app = express();
const port = 3000;


/* Server vars */

/* Middleware */
app.use(express.static('public'));
app.use("/", home);
app.use("/things", things);
app.use("/test", test);
app.use( (req, res, next) => {
    res.status(404).send('This page DNE. :(');
});
app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Woops! Server broke.');
    next();
});
app.use(cookieParser);


app.set('views', __dirname + '/views')
app.set('view engine', 'pug');
app.set('view cache', true)
app.set('env', 'development');

/* Server Start */
var server = app.listen(3000, '127.0.0.1', () => {
    var host = server.address().address;
    console.log(`App is running on http://${host}:${port}`);
});

/*--------------------- Intro -------------------------- */
// app.get('/', (request, response) => {
//     response.write('Hello World');
//     response.end();
// });

// app.get('/blocks', (request, response) => {
//     // var blocks = ['Fixed', 'Movable', 'Rotating'];
//     // var htmlBlocks = '<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>';
//     // response.send(htmlBlocks);
//     // response.json(blocks);
//     response.redirect(301, '/parts');
// });

// app.get('/blocked', (request, response) => {
//     response.redirect('/parts');
// });