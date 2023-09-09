const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/total-revenue', SalesController.totalRevenue);
router.get('/quantity-by-product', SalesController.quantityByProduct);
router.get('/top-products', SalesController.topProduct);
router.get('/average-price', SalesController.averagePrice);
router.get('/revenue-by-month', SalesController.revenueByMonth);
router.get('/highest-quantity-sold', SalesController.highestQuantitySold);

module.exports = router;