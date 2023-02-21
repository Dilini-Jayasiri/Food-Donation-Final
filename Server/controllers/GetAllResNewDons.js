const express = require('express');
const AllResDon = require('../models/reservedDonNew');

const router = express.Router();

router.get('/getCommResNew',(req,res)=>{
    AllResDon.find().exec((err,allResNew)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:true,
            existingDons:allResNew
            
        })
    })
})

module.exports = router;
