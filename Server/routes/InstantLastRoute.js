const express=require('express');
const router = express.Router();
const ReservedDonation = require('../models/instantDonationSchema')

const {
    lastDonationIns
} = require('../controllers/InstantLastRec')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)



router.get('/',lastDonationIns)


module.exports = router;