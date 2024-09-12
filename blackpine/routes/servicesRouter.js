const express = require('express')
const servicesRouter = express.Router()
const { createService, getServices, deleteService, updateService, addMany } = require('../controllers/servicesController')
const verifyToken = require('../middleware/verifyToken')


servicesRouter.get('/', getServices)
servicesRouter.post('/addMany', addMany)
servicesRouter.post('/',verifyToken, createService)
servicesRouter.delete('/:serviceId', verifyToken, deleteService)
servicesRouter.put('/:serviceId', verifyToken, updateService)

module.exports = servicesRouter