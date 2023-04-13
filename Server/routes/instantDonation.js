const express=require('express');
const router = express.Router();

const {
    createInsDonation,
    getDonations,
    getInstantDonation,
    deleteInstantDonation,
    updatenstantDonation
} = require('../controllers/instantDonationController')

//require auth for all donation routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createInsDonation);
//Get all donations
router.get('/',getDonations)

//GET a single donation
router.get('/:id',getInstantDonation)

//Delete a donation
router.delete('/:id',deleteInstantDonation)

//Update a donation
router.post('/:id',updatenstantDonation)

module.exports = router;