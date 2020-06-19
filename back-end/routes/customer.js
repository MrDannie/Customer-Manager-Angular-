const express = require('express');
const router = express.Router();
const customerContoller = require('../controller/customer');

router.get('/:id', customerContoller.getCustomer)
router.put('/:id', customerContoller.updateCustomer)
router.get('/page/:skip/:top', customerContoller.getCustomerPage)
router.post('/', customerContoller.insertCustomer)
router.delete('/:id', customerContoller.deleteCustomer)



module.exports = router