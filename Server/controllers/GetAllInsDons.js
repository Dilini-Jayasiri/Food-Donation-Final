const express = require('express');
const AllIns = require('../models/instantDonationSchema');

const router = express.Router();

router.get('/getAllIns',(req,res)=>{
    AllIns.find().exec((err,allIns)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:true,
            existingDons:allIns
            
        })
    })
})

module.exports = router;
