const InstantDonation = require('../models/instantDonationSchema')
const mongoose = require('mongoose')


//get all donations
const getDonations = async (req,res) => {
    const instantDonations = await InstantDonation.find({}).sort({createdAt:-1})

    res.status(200).json(instantDonations)
}

//get a single donation
const getInstantDonation = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }
    const instantDons = await InstantDonation.findById(id)

    if(!instantDons){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(instantDons)
}

//delete a donation
const deleteInstantDonation = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const instantDonation = await InstantDonation.findOneAndDelete({_id:id})

    if(!instantDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(instantDons)
}

//update a donation
const updatenstantDonation = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const instantDonation = await InstantDonation.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!instantDonation){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(instantDons)
}

module.exports= {
    getDonations,
    getInstantDonation,
    deleteInstantDonation,
    updatenstantDonation
}