const express = require("express")
const nodemailer = require("nodemailer");
var Pusher = require('pusher')
const pusher = new Pusher({
    appId: "1237432",
    key: "47cc8cb8a7dc948dc9ac",
    secret: "0f3a4d56c4976fe9ac83",
    cluster: "ap2",
    useTLS: true
  });


const app=express()

app.post('/comment', function(req, res){
    console.log(req.body);
    var newComment = {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({ created: true });
  });
  
    const http = require("http").Server(app);
    const io = require("socket.io")(http);
    const port = process.env.PORT || 4500;
    const path=require('path')
    app.use(express.json());
    app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
    // end parser middleware
    
    
    // custom middleware to log data access
    const log = function (request, response, next) {
        console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
        console.log(request.body); // make sure JSON middleware is loaded first
        next();
    }
    app.use(log);
    app.use(express.static(path.join(__dirname, "public")));
    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });
    
  app.get("/Sourcecode", function(req, res) {
        res.sendFile(__dirname + "/public/code.html");
    });
    app.get("/blogs",function(req,res){
        res.sendFile(__dirname+"/public/blog.html")
    })

    http.listen(port, function() {
        console.log("Listening on *:" + port);
    });
    const passport = require('passport');
    var userProfile;
    
    app.use(passport.initialize());
    app.use(passport.session());
    
 
    
    app.get('/success', (req, res) => res.send(userProfile));
    app.get('/error', (req, res) => res.send("error logging in"));
    
    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });
   const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '53546074546-teupejfnmq6nr56sasoq15erto3t80ko.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'jySurY_GSaWHGA3rU1Br0P5S';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4500"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });