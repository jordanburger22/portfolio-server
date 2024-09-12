const express = require('express')
const massageStylesRouter = express.Router()
const { createMassageStyle, getMassageStyles, updateMassageStyle, deleteMassageStyle, addMany } = require('../controllers/massageStylesController')
const {verifyToken, checkAdminRole} = require('../middleware/verifyToken')


massageStylesRouter.get('/', getMassageStyles)
massageStylesRouter.post('/',verifyToken, checkAdminRole, createMassageStyle)
// massageStylesRouter.post('/addMany', addMany)
massageStylesRouter.delete('/:massageStyleId', verifyToken, checkAdminRole, deleteMassageStyle)
massageStylesRouter.put('/:massageStyleId', verifyToken, checkAdminRole, updateMassageStyle)

module.exports = massageStylesRouter