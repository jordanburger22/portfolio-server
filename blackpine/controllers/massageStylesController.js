const MassageStyle = require('../models/massageStyles')


const createMassageStyle = async (req, res, next) => {
    try {
        const newMassageStyle = new MassageStyle(req.body)
        const savedMassageStyle = await newMassageStyle.save()
        return res.status(201).send(savedMassageStyle)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const  getMassageStyles = async (req, res, next) => {
    try {
        const massageStyles = await MassageStyle.find()
        return res.status(200).send(massageStyles)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const updateMassageStyle = async (req, res, next) => {
    try {
        const massageStyle = await MassageStyle.findByIdAndUpdate(req.params.massageStyleId, req.body, {new: true})
        if (!massageStyle) {
            res.status(404)
            return next(new Error('Massage style not found'))
        }
        return res.status(200).send(massageStyle)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const deleteMassageStyle = async (req, res, next) => {
    try {
        const deletedMassageStyle = await MassageStyle.findByIdAndDelete(req.params.massageStyleId)
        if (!deletedMassageStyle) {
            res.status(404)
            return next(new Error('Massage style not found'))
        }
        return res.status(200).send(`Successfully deleted massage style ${deletedMassageStyle.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const addMany = async (req, res, next) => {
    try {
        const newMassageStyles = req.body
        const savedMassageStyles = await MassageStyle.insertMany(newMassageStyles)
        return res.status(201).send(savedMassageStyles)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

module.exports = {
    createMassageStyle,
    getMassageStyles,
    updateMassageStyle,
    deleteMassageStyle,
    addMany
}