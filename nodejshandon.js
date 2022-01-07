const express = require("express");
const fs = require("fs");

//setting up the express router
const app = express();

app.use(express.json());

//write the code for routes here
app.post('/add', (req, res) => {
  var data = req.body;
  fs.writeFile('./post.json', data, () => {
    res.statusCode = 200;
    res.end();
  });
});

app.get('/view/:id', (req, res) => {
  fs.readFile('./get.json', (err, data) => {
    const parsedData = JSON.parse(data);
    parsedData.forEach(element => {
      if (element.id === req.params.id) {
        obj = element;
        return;
      }
    });
    res.statusCode = 200;
    res.send([obj]);
  });
});

app.get('/view', (req, res) => {
  let obj = {};
  fs.readFile('./get.json', (err, data) => {
    const parsedData = JSON.parse(data);
    obj = parsedData;
    res.statusCode = 200;
    res.send(obj);
  });
});

app.patch('/edit/:id?', (req, res) => {
  fs.readFile('./post.json', (err, data) => {
    const parsedData = JSON.parse(data);
    var keys = Object.keys(req.body);

    if (req.params.id) {
      parsedData.forEach( (element) => {
        if (element.id === req.params.id) {
          for (var i = 0; i < keys.length; i++) {
            element[keys[i]] = req.body[keys[i]]; 
          }
          return; 
        }
      });
    }
  });
});


module.exports = app;