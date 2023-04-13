const Calendar = require('../models/Calendar')
const mongoose = require('mongoose')

//post a donation
const createDate = async (req,res) => {
    const {orgName,orgEmail,donorName,date} = req.body

    let emptyFields = []

    if(!orgName){
        emptyFields.push('orgName')
    }
    if(!orgEmail){
        emptyFields.push('orgEmail')
    }
    if(!donorName){
        emptyFields.push('donorName')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }

    try {
        const user_id = req.user._id;
       const calendar = await Calendar.create({orgName,orgEmail,donorName,date,user_id})
       res.status(200).json(calendar)
    } catch (error){
        res.status(400).json({error:error.message});
       //res.status(400).json({error : error.message})
    }
} 

//get all donations
const getDates = async (req,res) => {
    const user_id = req.user._id
    const calendar = await Calendar.find({user_id}).sort({createdAt:-1})

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

module.exports= {
    createDate,
    deleteDate,
    updateDate,
    getDate,
    getDates
}