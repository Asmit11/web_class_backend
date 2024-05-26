const router = require('express').Router();
const productController = require('../controllers/productControllers') //manualling importing outside from the file

// Creating product registration route
router.post('/create', productController.createProduct)

// controller (export) - routes (import) - use - (index.js)

// exporting the router
module.exports = router
