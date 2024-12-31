const express = require('express');
const productListController = require('./path-to-productListController'); 

const router = express.Router();

// Define routes
router.post('/productLists', productListController.createProductList); 
router.get('/productLists', productListController.getAllProductLists);
router.get('/productLists/:id', productListController.getProductListById); 
router.put('/productLists/:id', productListController.updateProductList); 
router.delete('/productLists/:id', productListController.deleteProductList); 

module.exports = router;