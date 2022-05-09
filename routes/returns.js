
const express = require('express');
const { Rental } = require('../model/rentals');
const router = express.Router();

router.post('/', async(req, res) =>{
    if(!req.body.customerId) return res.status(400).send('CustomerId not can not be empty');
    if(!req.body.movieId) return res.status(400).send('MovieId not can not be empty');
    
    //  const rental = await Rental.findOne({
    //      'customer._id': req.body.customerId,
    //      'movie._id': req.body.movieId
    //  });

    // if(!rental) return res.status(404).send('Rental not found!!!!!!!');
    if(req.body.customerId && req.body.movieId) return res.status(404).send('We currently have no rental with the details supplied!!!!');
    if(req.body.dateReturned) return res.status(400).send('Rental return date already set');
    res.status(401).send('Unauthorized request');
    

})

module.exports = router;
