const Request = require('../models/requestSchema');
const mongoose = require('mongoose')
const InstDonSchema = require('../models/instantDonationSchema');
const ResDonSchema = require('../models/reservedDonationSchema');

const createRequest = async (req,res) => {
    const {orgName,orgEmail,orgSize,phone,city,quantity,orgType,reason,mealType,confirmedDate} = req.body

    let emptyFields = []

    if(!orgName){
        emptyFields.push('orgName')
    }
    if(!orgEmail){
        emptyFields.push('orgEmail')
    }
    if(!orgSize){
        emptyFields.push('orgSize')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!city){
        emptyFields.push('city')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(!orgType){
        emptyFields.push('orgType')
    }
    if(!reason){
        emptyFields.push('reason')
    }
    if(!mealType){
        emptyFields.push('mealType')
    }
    if(!confirmedDate){
        emptyFields.push('confirmedDate')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }

    try {
        const user_id = req.user._id;
       const request = await Request.create({orgName,orgEmail,orgSize,phone,city,quantity,orgType,reason,mealType,confirmedDate,user_id})
       res.status(200).json(request)
    } catch (error){
        res.status(400).json({error:error.message});
       //res.status(400).json({error : error.message})
    }
} 

//get All requests
// const getUserRequests = async (req,res) => {
//     const user_id = req.user._id;
//     const requests = await Request.find({user_id}).sort({createdAt: -1})

//     res.status(200).json(requests)
// }

//get All requests
// const getRequests = async (req,res) => {
//     const requests = await Request.find({}).sort({createdAt: -1})

//     res.status(200).json(requests)
// }

const lastRequest = async (req,res) => {

    const user_id = req.user._id;
              const dons = await Request.find({user_id}).sort({_id:-1}).limit(1);
              if(!dons){
                return res.status(404).json({error:'No such donation'})
            }
            res.status(200).json(dons)
}


// const lastRequest = async (req,res) => {
//     const user_id = req.user._id;
//     const donation = await Request.findOne({ user_id })
//                                   .sort({ _id: -1 })
//                                   .lean();
//     if (!donation) {
//         return res.status(404).json({ error: 'No such donation' });
//     }
//     res.status(200).json(donation);
// }
//get a single request
// const getRequest = async (req,res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:"No such request"})
//     }

//     const request = await Request.findById(id)

//     if(!request){
//         return res.status(404).json({error:"No such request"})
//     }
//     res.status(200).json(request)
// }

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


// Kumesh
const getOrganizationDonationDetails = async (req, res) => {
    const { orgName } = req.params;
    let donarList = [];
    console.log(orgName);
    try {
        // const instDonList = await InstDonSchema.find({ orgName: orgName });
        // const resDonList = await ResDonSchema.find({ orgName: orgName });

        // // Check Whether the Data is Available
        // if(instDonList){
        //     instDonList.forEach(element => {
        //         donarList.push(element);
        //     });
        // }else if(resDonList){
        //     resDonList.forEach(element => {
        //         donarList.push(element);
        //     });
        // }else if(!instDonList && !resDonList){
        //     return res.status(404).json({error:'No such donation'})
        // }else{
        //     return res.status(404).json({error:'No such donation'})
        // }
      res.status(200).json(orgName)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createRequest,
   // getRequest,
   /// getUserRequests,
   lastRequest,
    //getRequests,
    deleteRequest,
    updateRequest,
    getOrganizationDonationDetails
}