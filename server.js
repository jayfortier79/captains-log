require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Log = require('./models/logs');
const methodOverride = require('method-override');

//Connect to Mongo
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const jsxViewEngine = require('jsx-view-engine');

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected!'));
db.on('close', () => console.log('mongo disconnected'));


app.set('view engine', 'jsx')
app.set('views', './views')
app.engine('jsx',jsxViewEngine())

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


// Index
app.get('/logs', async (req, res) => {
  try {
    const foundLogs = await Log.find({});
    console.log(foundLogs);
    res.status(200).render('/logs', {
      logs: foundLogs,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

  // New
  app.get('/logs/new', (req, res) => {
    res.render('New');
  });

  // Delete
  app.delete('/logs/:id', async (req, res) => {
    // this is is going to actually implement the delete functionality from the database
    try {
      // we are getting this id from the req params (:id)
      await Log.findByIdAndDelete(req.params.id);
      res.status(200).redirect('/logs');
    } catch (err) {
      res.status(400).send(err);
    }})


// Create
app.post('/logs', async (req, res) => {
    try {
     
      req.body.ShipisBroken = req.body.ShipisBroken === 'on';
  
      const createdLog = await Log.create(req.body);
  
      res.status(201).redirect('/logs');
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // Show
app.get('/logs/:id', async (req, res) => {
    try {
      const foundLogs = await Log.findById(req.params.id);
  
      //second param of the render method must be an object
      res.render('logs/Show', {
        lgg: foundLogs
      });
    } catch (err) {
      res.status(400).send(err).redirect('/logs');
    }
  });




    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
      });
