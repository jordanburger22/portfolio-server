const express = require('express')
const businessInfoRouter = express.Router()
const { createBusinessInfo, getBusinessInfo, updateBusinessInfo } = require('../controllers/businessInfoController')
const {verifyToken, checkAdminRole} = require('../middleware/verifyToken')



businessInfoRouter.post('/', createBusinessInfo)
businessInfoRouter.get('/', getBusinessInfo)
businessInfoRouter.put('/:businessInfoId', verifyToken, checkAdminRole, updateBusinessInfo)


module.exports = businessInfoRouter