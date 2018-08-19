const express = require('express')
const next = require('next')

const config = require('./server/config.js')

const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors')
const RateLimit = require('express-rate-limit');
// anti ddos ..
const Ddos = require('ddos')
let ddos = new Ddos({burst:10, limit:15})


// passport imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

// mongo imports
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const {mongoose} = require('./db/mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// routes
const index = require('./server/routes/index')
const docs = require('./server/routes/docs')


// api
const screenshot = require(`./server/api/screenshot`)
const getScreenshot = require(`./server/api/getscreenshot`)

let limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.prepare()
  .then(() => {
    const server = express()

    //server.use(ddos.express); // couse 500 error BUG
    server.use(logger("dev"));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser(config.cookieParserSecret));
    server.use(express.static(path.join(__dirname, "public")));
    server.use(session());
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(cors())
    server.use(limiter)

    // passport initialize
    const {User} = require('./db/models/UserSchema.js');
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    // pages
    server.use('/', index)    
    server.use('/dics', docs)

    // api
    server.use('/screenshot', screenshot)
    server.use('/getscreenshot', getScreenshot)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT || 3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })