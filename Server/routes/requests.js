const express=require('express');

const {
    createRequest,
   // getRequest,
   // getUserRequests,
   lastRequest,
    //getRequests,
    deleteRequest,
    updateRequest
} = require('../controllers/requests.js');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Post donation
router.post('/',createRequest);

 router.get('/',lastRequest);
//router.get('/',getUserRequests);
//Get all requests
//router.get('/',getRequests);

//Get a single request
///router.get('/:id',getRequest)

//Delete a request
router.delete('/:id',deleteRequest)

// //Update a request
router.patch('/:id',updateRequest)

module.exports = router;

