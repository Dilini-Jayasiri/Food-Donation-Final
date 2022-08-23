const Request = require('../models/requestSchema');
const mongoose = require('mongoose')

//get All requests
const getRequests = async (req,res) => {
    const requests = await Request.find({}).sort({createdAt: -1})

    res.status(200).json(requests)
}

//get a single request
const getRequest = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such request"})
    }

    const request = await Request.findById(id)

    if(!request){
        return res.status(404).json({error:"No such request"})
    }
    res.status(200).json(request)
}

//delete a request
const deleteRequest = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such request"})
    }

    const request = await Request.findOneAndDelete({_id:id})

    if(!request){
        return res.status(404).json({error:"No such request"})
    }
    res.status(200).json(request)
}

//update a request
const updateRequest = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such request"})
    }

    const request = await Request.findAndUpdate({_id:id},{
        ...req.body
    })

    if(!request){
        return res.status(400).json({error:"No such request"})
    }
    res.status(200).json(request)
}

module.exports = {
    getRequest,
    getRequests,
    deleteRequest,
    updateRequest
}