import express from 'express';
import path from 'path';
import { things } from './routes/things.js'
import { test }from './routes/test.js'
import cookieParser from 'cookie-parser';



const __dirname = path.resolve(path.dirname(''));
var app = express();
const port = 3000;

/* Server vars */

/* Middleware */
app.use(express.static('public'));
app.use("/things", things);
app.use("/test", test);
app.use(cookieParser);


app.set('views', __dirname + '/views')
app.set('view engine', 'pug');
app.set('view cache', true)
app.set('env', 'development');


/* Routes */
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

/*--------------- Serving Static Files ------------------*/
app.get('/receiveFile', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});

app.get('/home/render', (req, res) => {
    res.render('index', 
    {
        title: 'My Title',
        message: 'Hello World (Template)'
    });
});

app.get('/home/editForm', (req, res) => {
    res.render('edit-form');
});

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