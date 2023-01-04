const express=require('express');
const router = express.Router();
const ReservedDonation = require('../models/reservedDonationSchema')

const {
    lastDonation
} = require('../controllers/ReservedLastRec')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)



router.get('/',lastDonation)


module.exports = router;