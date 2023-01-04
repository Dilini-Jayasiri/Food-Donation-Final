
const ReservedDonation = require('../models/reservedDonationSchema')
const mongoose = require('mongoose')


//post donation
const createResDonation = async (req,res) => {
    const {donorName,phone,donEmail,address,orgName,date,foodName,quantity,mealType,foodType} = req.body

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
    if(!foodName){
        emptyFields.push('foodName')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(!mealType){
        emptyFields.push('mealType')
    }
    if(!foodType){
        emptyFields.push('foodType')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }

    try {
        const user_id = req.user._id;
       const reservedDonation = await ReservedDonation.create({donorName,phone,donEmail,address,orgName,date,foodName,quantity,mealType,foodType,user_id})
       res.status(200).json(reservedDonation)
    } catch (error){
        res.status(400).json({error:error.message});
       //res.status(400).json({error : error.message})
    }
} 



//get all donations
const getDonations = async (req,res) => {
    const user_id = req.user._id

    const reservedDonations = await ReservedDonation.find({user_id}).sort({createdAt:-1})

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

// const lastDonation = async (req,res) => {

//               const dons = await ReservedDonation.find().sort({_id:-1}).limit(1);
//               if(!dons){
//                 return res.status(404).json({error:'No such donation'})
//             }
//             res.status(200).json(reservedDons)
// }

// const lastDonation = async (req, res) => {
//     try {
//       const data = await ReservedDonation.findOne().sort({ field: 'asc', _id: -1 });
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
//   const lastDonation = async (req,res) => {

//     const user_id = req.user._id;
//               const dons = await ReservedDonation.find({user_id}).sort({_id:-1}).limit(1);
//               if(!dons){
//                 return res.status(404).json({error:'No such donation'})
//             }
//             res.status(200).json(dons)
// }
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
    createResDonation,
    getDonations,
    getReservedDonation,
   // lastDonation,
    deleteReservedDonation,
    updateReservedDonation
}