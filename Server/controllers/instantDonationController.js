const InstantDonation = require('../models/instantDonationSchema')
const mongoose = require('mongoose')

//post a donation
const createInsDonation = async (req,res) => {
    const {donorName,phone,donEmail,address,orgName,date,quantity,oldFood,mealType,area,foodType,foodName} = req.body

    let emptyFields = []

    if(!donorName){
        emptyFields.push('donorName')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!donEmail){
        emptyFields.push('donEmail')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!orgName){
        emptyFields.push('orgName')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(!oldFood){
        emptyFields.push('oldFood')
    }
    if(!mealType){
        emptyFields.push('mealType')
    }
    if(!area){
        emptyFields.push('area')
    }
    if(!foodType){
        emptyFields.push('foodType')
    }
    if(!foodName){
        emptyFields.push('foodName')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }

    try {
        const user_id = req.user._id;
       const instantDonation = await InstantDonation.create({donorName,phone,donEmail,address,orgName,date,quantity,oldFood,mealType,area,foodType,foodName,user_id})
       res.status(200).json(instantDonation)
    } catch (error){
        res.status(400).json({error:error.message});
       //res.status(400).json({error : error.message})
    }
} 

//get all donations
const getDonations = async (req,res) => {
    const user_id = req.user._id
    const instantDonations = await InstantDonation.find({user_id}).sort({createdAt:-1})

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
    createInsDonation,
    getDonations,
    getInstantDonation,
    deleteInstantDonation,
    updatenstantDonation
}