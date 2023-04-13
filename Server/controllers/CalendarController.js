const Calendar = require('../models/Calendar')
const mongoose = require('mongoose')

//post a donation
const createDate = async (req,res) => {
    const {donorName,donorEmail,mealType,phone,confirmedDate} = req.body

    let emptyFields = []

    if(!donorName){
        emptyFields.push('donorName')
    }
    if(!donorEmail){
        emptyFields.push('donorEmail')
    }
    if(!mealType){
        emptyFields.push('mealType')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!confirmedDate){
        emptyFields.push('confirmedDate')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }

    try {
        const user_id = req.user._id;
       const calendar = await Calendar.create({donorName,donorEmail,mealType,phone,confirmedDate,user_id})
       res.status(200).json(calendar)
    } catch (error){
       // res.status(400).json({error:error});
       res.status(400).json({error : error.message})
    }
} 

//delete a donation
const deleteDate = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const calendar = await Calendar.findOneAndDelete({_id:id})

    if(!calendar){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(calendar)
}


//update a donation
const updateDate = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such donation'})
    }

    const calendar = await Calendar.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!calendar){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(calendar)
}

//get a single donation
const getDate = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Date'})
    }
    const calendar = await Calendar.findById(id)

    if(!calendar){
        return res.status(404).json({error:'No such donation'})
    }
    res.status(200).json(calendar)
}

//get all donations
const getDates = async (req,res) => {
    const user_id = req.user._id
    const calendar = await Calendar.find({user_id}).sort({createdAt:-1})
    res.status(200).json(calendar)
}


module.exports= {
    createDate,
    deleteDate,
    updateDate,
    getDate,
    getDates
}