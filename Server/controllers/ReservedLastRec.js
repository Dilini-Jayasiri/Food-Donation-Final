
const ReservedDonation = require('../models/reservedDonationSchema')
const mongoose = require('mongoose')


  const lastDonation = async (req,res) => {

    const user_id = req.user._id;
              const dons = await ReservedDonation.find({user_id}).sort({_id:-1}).limit(1);
              if(!dons){
                return res.status(404).json({error:'No such donation'})
            }
            res.status(200).json(dons)
}


module.exports= {
    lastDonation
}