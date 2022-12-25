const express=require('express');
const router = express.Router();

const {
    createDonationStatus,
    getDonationsStatus,
    getDonationStatus,
    deleteDonationStatus,
    updateDonationStatus
} = require('../controllers/StatusController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createDonationStatus);
//Get all donations
router.get('/',getDonationsStatus)

//GET a single donation
router.get('/:id',getDonationStatus)

//Delete a donation
router.delete('/:id',deleteDonationStatus)

//Update a donation
router.patch('/:id',updateDonationStatus)

module.exports = router;