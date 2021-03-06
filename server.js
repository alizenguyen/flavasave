const express = require("express");
const bodyParser = require("body-parser");

var session = require("express-session");
//requring models for syncing
const db = require("./models");
// Requiring passport as we've configured it
var passport = require("./config/passport");

//const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
  //if process.env.NODE_ENV === "production"
app.use(express.static("client/build"));
// Add routes, both API and view
//require("./controllers/html-routes.js")(app);
require("./controllers/ingredient-api-routes.js")(app);
require("./controllers/instruction-api-routes.js")(app);
require("./controllers/recipe-api-routes.js")(app);
require("./controllers/tag-api-routes.js")(app);
//require("./controllers/recipe-display-routes.js")(app);
require("./controllers/bookmarklet-routes.js")(app);
//require("./controllers/login-html-routes.js")(app);
require("./controllers/login-api-routes.js")(app);

// Start the API server
//syncs sequelize models and waits till update complete before starting server
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
