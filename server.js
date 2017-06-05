'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var HighScore = require('./model/highScore');
require('dotenv').config()

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://jkranking:' + process.env.REACT_APP_PASS + '.mlab.com:31511/test-db');

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /scores route to our /api router
router.route('/highscores')
  //retrieve all scores from the database
  .get(function(req, res) {
    //looks at our Score Schema
    HighScore.find(function(err, scores) {
      if (err)
        res.send(err);
      //responds with a json object of our database scores.
      res.json(scores)
    });
  })

  // post new score to the database
  .post(function(req, res) {
    var highScore = new HighScore();
    //body parser lets us use the req.body
    highScore.player = req.body.player;
    highScore.score = req.body.score;

    highScore.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Score successfully added!' });
    });
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});