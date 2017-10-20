var Sequelize = require('sequelize');

var sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
});

//I hide the db url. See lines 3-10
// var sequelize = new Sequelize('postgres://yimd85@localhost:5432/bulletinboard');




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




  title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
			       notEmpty: true
         }
  },
  body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
             notEmpty: true
         }
  },
  //i've renamed the fields to be called title and body
  //i've created 2 validation paramsters to with argurements so that it is a required field.
  //see lines 36-49



  // user: Sequelize.STRING(100),
  // post: Sequelize.TEXT,


  created: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        field: 'created_at'
    }//i've created the create_at field. See lines 56-59

});

//creating first entry
Stuff
  .sync()
    .then(function(){
      Stuff.create({
          title: 'bobo',
          body: 'first post and screw hello world!'
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
            title: request.body.user,
            body: request.body.post
        });
        response.redirect('/')
  })
})


app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});
