const express = require('express')
const businessInfoRouter = express.Router()
const { createBusinessInfo, getBusinessInfo, updateBusinessInfo } = require('../controllers/businessInfoController')
const verifyToken = require('../middleware/verifyToken')



businessInfoRouter.post('/', createBusinessInfo)
businessInfoRouter.get('/', getBusinessInfo)
businessInfoRouter.put('/:businessInfoId', verifyToken, updateBusinessInfo)


module.exports = businessInfoRouter