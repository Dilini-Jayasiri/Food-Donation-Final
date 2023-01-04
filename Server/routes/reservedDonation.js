const express=require('express');
const router = express.Router();
const ReservedDonation = require('../models/reservedDonationSchema')

const {
    createResDonation,
    getDonations,
    getReservedDonation,
    //lastDonation,
    deleteReservedDonation,
    updateReservedDonation
} = require('../controllers/reservedDonationController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createResDonation);
//Get all donations
router.get('/',getDonations)

//GET a single donation
router.get('/:id',getReservedDonation)

// router.get('/',lastDonation)


//router.get('/:id', dataController.getLastRecordForUser);
//Delete a donation
router.delete('/:id',deleteReservedDonation)

//Update a donation
router.patch('/:id',updateReservedDonation)

module.exports = router;