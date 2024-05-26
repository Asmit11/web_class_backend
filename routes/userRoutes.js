const router = require('express').Router();
const userController = require('../controllers/userControllers') //manualling importing outside from the file

// Creating user registration route
router.post('/create', userController.createUser)

// login routes
router.post('/login', userController.loginUser)

// controller (export) - routes (import) - use - (index.js)

// exporting the router
module.exports = router
