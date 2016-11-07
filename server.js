/* Dependencies */
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // for deletes in express
var exphbs = require('express-handlebars');

// Our model controllers (rather than routes)
var burgers_controller = require('./controllers/burgers_controller');

/* Express settings */
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance. 
    defaultLayout: 'main',
    helpers: {
      counter: function (index) {
  			return index + 1;
  		}
    }
});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', burgers_controller);

/* ERROR HANDLER */
// =============
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 500 or other error
// no stacktraces leaked to user unless in development environment
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});*/

// our module get's exported as app.
module.exports = app;