const express=require('express');
const router = express.Router();


const {
    lastDonationComm
} = require('../controllers/CommonLastRec')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)



router.get('/',lastDonationComm)


module.exports = router;