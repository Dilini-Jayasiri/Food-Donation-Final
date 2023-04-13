const express=require('express');

const {
    createDate,
    deleteDate,
    updateDate,
    getDate,
    getDates
} = require('../controllers/CalendarController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createDate);

//Delete a request
router.delete('/:id',deleteDate);

//Update a request
router.patch('/:id',updateDate);


//get One date
router.get('/findDate/:orgEmail', getDate);

//Get all Dates
router.get('/',getDates);


module.exports = router;

