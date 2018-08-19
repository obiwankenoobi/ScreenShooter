let MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
let config = require('../server/config.js')


// checking for enviroment var for the mongo server and connect to it if there is one
// if there isnt connect to localhost
if (process.env.mongoUrl) {
  mongoose.connect(config.mongoUrl, {
      auth: {
        user: config.mongoUsername,
        password: config.mongoPw
      }
    })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));
} else {
  var url = "mongodb://localhost:27017/db";
  mongoose.connect(url, { useNewUrlParser: true }, console.log('connected to mongo'));
}

mongoose.Promise = global.Promise;


module.exports = {mongoose};