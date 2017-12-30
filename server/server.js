const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const articleController = require('./articleController.js');

app.use(express.static(path.join(__dirname, './../build'))); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/saveArticles', articleController.saveArticles);
app.get('/getArticles', articleController.getArticles);
app.delete('/removeArticles', articleController.removeArticles);





let port = 8081
app.listen(port, () => {
  console.log(`server listening to PORT ${port}!`);
});