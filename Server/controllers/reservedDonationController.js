const ReservedDonation = require('../models/reservedDonationSchema')
const mongoose = require('mongoose')


//get all donations
const getDonations = async (req,res) => {
    const reservedDonations = await ReservedDonation.find({}).sort({createdAt:-1})

    res.status(200).json(reservedDonations)
}

//get a single donation
const getReservedDonation = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }
    const reservedDons = await ReservedDonation.findById(id)

    if(!reservedDons){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDons)
}

//delete a donation
const deleteReservedDonation = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const reservedDonation = await ReservedDonation.findOneAndDelete({_id:id})

    if(!reservedDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDonation)
}

//update a donation
const updateReservedDonation = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const reservedDonation = await ReservedDonation.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!reservedDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(reservedDonation)
}

module.exports= {
    getDonations,
    getReservedDonation,
    deleteReservedDonation,
    updateReservedDonation
}