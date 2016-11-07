// this is the burgers_controller.js file

var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {

  // TODO:
  // =====
  // use the Burger model to find all burgers
  models.burgers.findAll()
  // connect that to this .then
  .then(function(burgers) {
    res.render('index', {
      burgers: burgers
    })
  })
});

router.post('/create', function (req, res) {

  // TODO:
  // =====
  // use the Burger model to create a burger based on what's
  // passed in req.body (burger_name, devoured, date)
  var UTCTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  models.burgers.create({
    burger_name: req.body.burger,
    devoured: '0',
    date: UTCTime
  })
  // connect that to this .then
  .then(function() {
    res.redirect('/');
  })
});

router.put('/update/:id', function(req,res) {

  // TODO:
  // =====
  // use the Burger model to update a burger's devoured status
  // based on the boolean passed in req.body devoured
  // and the id of the burger (as passed in the url)
  models.burgers.find({ where: { id: req.params.id } })
  .then(function(burger){
    burger.update({ devoured: req.body.devoured })  
    // connect that to this .then.
    .then(function (result) {
      res.redirect('/');
    })
  })
});

/*
router.delete('/delete/:id', function(req,res) {
  
  // TODO:
  // =====
  // use the Burger model to delete a burger
  // based on the id passed in the url


  // connect that to this .then.
  .then(function() {
    res.redirect('/');
  });
});
*/

module.exports = router;
