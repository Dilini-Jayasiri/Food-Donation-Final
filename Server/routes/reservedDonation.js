const express=require('express');
const router = express.Router();

const {
    getDonations,
    getReservedDonation,
    deleteReservedDonation,
    updateReservedDonation
} = require('../controllers/reservedDonationController')

//Get all donations
router.get('/',getDonations)

//GET a single donation
router.get('/:id',getReservedDonation)

//Delete a donation
router.delete('/:id',deleteReservedDonation)

//Update a donation
router.patch('/:id',updateReservedDonation)

module.exports = router;