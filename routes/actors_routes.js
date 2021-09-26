const express = require('express')
const router = express.Router();

const actors_controllers = require('../controllers/actors')

router.get('/actorsMovies', actors_controllers.actorsMovies); //שאלה ראשונה

module.exports = router;