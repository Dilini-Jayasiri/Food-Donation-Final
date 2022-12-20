const express=require('express');
const router = express.Router();


const {
    createResNewDonation,
    getDonations,
    getReservedDonation,
    deleteReservedDonation,
    updateReservedDonation
} = require('../controllers/reservedDonationNewController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createResNewDonation);
//Get all donations
router.get('/',getDonations)

//GET a single donation
router.get('/:id',getReservedDonation)

//Delete a donation
router.delete('/:id',deleteReservedDonation)

//Update a donation
router.patch('/:id',updateReservedDonation)

module.exports = router;