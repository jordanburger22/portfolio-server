const express = require('express')
const servicesRouter = express.Router()
const { createService, getServices, deleteService, updateService, addMany } = require('../controllers/servicesController')
const {verifyToken, checkAdminRole} = require('../middleware/verifyToken')


servicesRouter.get('/', getServices)
// servicesRouter.post('/addMany', addMany)
servicesRouter.post('/',verifyToken, checkAdminRole, createService)
servicesRouter.delete('/:serviceId', verifyToken, checkAdminRole, deleteService)
servicesRouter.put('/:serviceId', verifyToken, checkAdminRole, updateService)

module.exports = servicesRouter