const express=require('express');

const {
    getRequest,
    getRequests,
    deleteRequest,
    updateRequest
} = require('../controllers/requests.js');

const router = express.Router();

//Get all requests
router.get('/',getRequests);

//Get a single request
router.get('/:id',getRequest)

//Post a new request
// router.post('/requests',async (req,res)=>{
//     //res.json({msg:"Post a new request"})
//     try{
//         //Get body or data
//         const orgName = req.body.orgName;
//         const orgType = req.body.orgType;
//         const orgEmail = req.body.orgEmail;
//         const orgSize = req.body.orgSize;
//         const phone = req.body.phone;
//         const city = req.body.city;
//         const mealType = req.body.mealType;
//         const quantity = req.body.quantity;
//         const reason = req.body.reason;
//         const confirmedDate = req.body.confirmedDate;


//         const request= new Request({
//             orgName : orgName,
//             orgType : orgType,
//             orgEmail : orgEmail,
//             orgSize : orgSize,
//             phone : phone,
//             city : city,
//             mealType : mealType,
//             quantity : quantity,
//             reason : reason,
//             confirmedDate : confirmedDate,
//         });

//         //Save method is used to create user
//         //But before saving or inserting, password will hash.
//         //Because of hashing.After hash, it will save to DB
//         const created = await request.save();
//         console.log(created);
//         res.status(200).send("Request Sent");

//     }catch(error){
//         res.status(400).send(error);
//     }

// })

//Delete a request
router.delete('/:id',deleteRequest)

// //Update a request
router.patch('/:id',updateRequest)

module.exports = router;

