const express = require('express')
const router = express.Router();

const actors_controllers = require('../controllers/actors')

// router.get('/actorsMovies', actors_controllers.mooviesArray); // עוד אופציה  רשימת סרטים-שאלה ראשונה
// router.get('/actorsMovies', actors_controllers.actorsMovies); //רשימת סרטים-שאלה ראשונה
router.get('/actorsMovies', actors_controllers.mervalMovies); // רשימת סרטי מרוול-שאלה ראשונה
// router.get('/actorsMovies', actors_controllers.bonus); //בונוס


module.exports = router;