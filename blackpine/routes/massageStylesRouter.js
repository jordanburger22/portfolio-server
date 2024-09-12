const express = require('express')
const massageStylesRouter = express.Router()
const { createMassageStyle, getMassageStyles, updateMassageStyle, deleteMassageStyle, addMany } = require('../controllers/massageStylesController')
const verifyToken = require('../middleware/verifyToken')


massageStylesRouter.get('/', getMassageStyles)
massageStylesRouter.post('/',verifyToken, createMassageStyle)
massageStylesRouter.post('/addMany', addMany)
massageStylesRouter.delete('/:massageStyleId', verifyToken, deleteMassageStyle)
massageStylesRouter.put('/:massageStyleId', verifyToken, updateMassageStyle)

module.exports = massageStylesRouter