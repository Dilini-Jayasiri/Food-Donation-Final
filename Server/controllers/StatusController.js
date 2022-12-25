const Status = require("../models/statusSchema")
const mongoose = require('mongoose')

//post status
const createDonationStatus = async (req,res) => {
    const {status} = req.body

    if(!status){
        emptyFields.push('status')
    }

    try {
        const user_id = req.user._id;
       const donationStatus = await Status.create({status,user_id})
       res.status(200).json(donationStatus)
    } catch (error){
        res.status(400).json({error:error.message});
       //res.status(400).json({error : error.message})
    }
}

//get all status
const getDonationsStatus = async (req,res) => {
    const user_id = req.user._id

    const donationStatus = await Status.find({user_id}).sort({createdAt:-1})

    res.status(200).json(donationStatus)
}

//get a single donation
const getDonationStatus = async (req,res) =>{
    
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such status'})
    }
    const reservedDons = await Status.findById(id)

    if(!reservedDons){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDons)
}

//delete a donation
const deleteDonationStatus = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const reservedDonation = await Status.findOneAndDelete({_id:id})

    if(!reservedDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDonation)
}

//update a status
const updateDonationStatus = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const reservedDonation = await Status.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!reservedDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDonation)
}

module.exports= {
    createDonationStatus,
    getDonationsStatus,
    getDonationStatus,
    deleteDonationStatus,
    updateDonationStatus
}