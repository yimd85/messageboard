var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://yimd85@localhost:5432/bulletinboard');

var express = require('express');
var path = require('path')
var bodyParser= require('body-parser')
var app = express();


app.set('view engine','ejs');
app.set('views','./views')
// app.set('views',__dirname+'/views')
app.use(express.static(path.join(__dirname,'cssfolder')))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

var Stuff = sequelize.define('boardpost', {
  user: Sequelize.STRING(100),
  post: Sequelize.TEXT
});

//creating first entry
Stuff
  .sync()
    .then(function(){
      Stuff.create({
          user: 'bobo',
          post: 'first post and screw hello world!'
      });
  })

app.get('/',function(request,response){
  Stuff.
    findAll()
      .then(function(rows){
          response.render('xedni',{messages:rows});
          })
});

app.get('/addshit',function(request,response){
  response.render('index')
});

app.post('/addshit',function(request,response){
  Stuff
    .findAll()
      .then(function(){
        Stuff.create({
            user: request.body.user,
            post: request.body.post
        });
        response.redirect('/')
  })
})


app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});
