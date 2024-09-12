const BusinessInfo = require('../models/businessInfo')
const Admin = require('../models/user')


const createBusinessInfo = async (req, res, next) => {
    try {
        const newBusinessInfo = new BusinessInfo(req.body)
        const savedBusinessInfo = await newBusinessInfo.save()
        return res.status(201).send(savedBusinessInfo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const getBusinessInfo = async (req, res, next) => {
    try {
        const businessInfo = await BusinessInfo.find()
        return res.status(200).send(businessInfo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

const updateBusinessInfo = async (req, res, next) => {
    try {
        const isUserAdmin = Admin.findOne({_id: req.auth._id})
        if (!isUserAdmin) {
            res.status(403)
            return next(new Error('You are not authorized to update business info'))
        }
        const businessInfo = await BusinessInfo.findOneAndUpdate({_id: req.params.businessInfoId, }, req.body, { new: true })
        return res.status(200).send(businessInfo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
}

module.exports = {
    createBusinessInfo,
    getBusinessInfo,
    updateBusinessInfo
}