const express=require('express');
const router = express.Router();

const {
    getDonations,
    getInstantDonation,
    deleteInstantDonation,
    updatenstantDonation
} = require('../controllers/instantDonationController')

//Get all donations
router.get('/',getDonations)

//GET a single donation
router.get('/:id',getInstantDonation)

//Delete a donation
router.delete('/:id',deleteInstantDonation)

//Update a donation
router.patch('/:id',updatenstantDonation)

module.exports = router;