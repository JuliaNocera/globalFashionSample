//Base Setup 
//==============================================================================================

//require packages needed
var _ = require('lodash');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// configure app to use bodyParser()
// lets us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = require('http').Server(app);
var port = process.env.PORT || 8100;

// connect to our mongolab database
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_n2bzq406:e48g19qkl7fets384rijht8sq2@ds033175.mongolab.com:33175/heroku_n2bzq406'); // connect to our database

// fashion db schema 
var Fashion = require('./models/fashion');


// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening');
    next(); // makes sure we go to the next routes and doesn't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8100/api)
router.get('/', function(req, res) {
    res.json({ message: 'api is working!' });   
});

// more routes for our API :

router.route('/fashion')

	// create an item (accessed at POST http://localhost:8100/api/fashion) 
  // not needed in this sample application, but could easily be implemented on the front end to add user's own item
	.post(function(req, res) {
	    
    var fashion = new Fashion();      // create a new instance of the Fashion model
    fashion.title = req.body.title;  // set the fashion info (comes from the request)
    fashion.blurb = req.body.blurb;
    fashion.author = req.body.author
    fashion.thumbnail_url = req.body.thumbnail_url;
    fashion.details_url = req.body.details_url
    
    // save the item and check for errors
    fashion.save(function(err) {
      if (err) {
          res.send(err);
      }

      res.json({ message: 'Fashion item created!' });
    });
	    
	})

  // get the items in db (accessed at GET http://localhost:8100/api/fashion)
	.get(function(req, res) {
    Fashion.find(function(err, item) {
      if (err) {
        res.send(err);
      }

      res.json(item);
    });
	})


// route for individual item 
// not needed in this sample application
// but could be desired in a production application 
router.route('/fashion/:item_id')

  // get an individual item (accessed at GET http://localhost:8100/api/fashion/:item_id)
	.get(function(req, res) {
    Fashion.findById(req.params.item_id, function(err, item) {
      if (err)
        res.send(err);
      res.json(item);
    });
  })

  // update the item with this id (accessed at PUT http://localhost:8100/api/item/:item_id)
  .put(function(req, res) {

    // use our item model to find the item we want
    Fashion.findById(req.params.item_id, function(err, item) {

      if (err)
        res.send(err);

      item.name = req.body.name;  // update the item's info

      // save the item
      item.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Item updated!' });
      });

    });
  })

  // delete the item with this id (accessed at DELETE htstp://localhost:8100/api/fasion/:item_id)
  .delete(function(req, res) {
    Fashion.remove({
      _id: req.params.item_id
    }, function(err, item) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START SERVER
server.listen(port, function() {
	console.log('Running on port: ', port);
});

// serve files in client
var staticPath = path.join(__dirname, 'client');
app.use(express.static(staticPath));

