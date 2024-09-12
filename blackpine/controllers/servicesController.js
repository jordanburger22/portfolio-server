const Service = require('../models/services')



const createService = async(req,res,next) => {
    try {
        const newService = new Service(req.body)
        const savedService = await newService.save()
        return res.status(201).send(savedService)
    } catch (err) {
       res.status(500)
       return next(err) 
    }
}


const getServices = async(req,res,next) => {
    try {
        const services = await Service.find()
        return res.status(200).send(services)
    } catch (err) {
        res.status(500)
        return next(err)
    }
}

const deleteService = async(req,res,next) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.serviceId)
        return res.status(200).send(deletedService)
    } catch (err) {
        res.status(500)
        return next(err)
    }
}

const updateService = async(req,res,next) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.serviceId, req.body, {new: true})
        return res.status(200).send(updatedService)
    } catch (err) {
        res.status(500)
        return next(err)
    }
}

const addMany = async(req,res,next) => {
    try {
        const addedServices = await Service.insertMany(req.body)
        return res.status(200).send(addedServices)
    } catch (err) {
        res.status(500)
        return next(err)
    }
}


module.exports = {
    createService,
    getServices,
    deleteService,
    updateService,
    addMany
}