
const auth = require('../middlewares/auth');
const {Customer, validate} = require('../model/customer')
const { Router } = require('express');
const express = require('express');
const { Schema } = require('mongoose');
const router = express.Router();
const { json } = require('express/lib/response');




router.get('/', async (req, res) =>{
    const customers = await Customer.find();
    res.send(customers);
})


router.get('/:id', async(req, res) =>{
    const customer = await Customer.findById(req.params.id);
    res.send(customer);

    if(!customer){
        res.status(404).send("The genre of movies you are looking for is currently not available. Do well to check back later");
        return;
    }

    
});

router.post('/',auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0]);
        return;

    }
    // const genre = genres.find(finderfunction => finderfunction.name === req.body.name);
    // if (genre) return res.status(400).send(`${genre.name} already exist in the database!!!!!!!!!!!!!`);
        
        
    
        let customer = new Customer ({
            name : req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });
        customer = await (customer.save());
        res.send(`Customer with name ${customer.name} has successfully been added to the database!!!!!!!!!!!!!!!!`);

});


router.put('/:id', auth, async(req, res) =>{
    
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;


    }
    
    idHolder = req.params.id;
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, {new: true
    })
    
    res.send(`The ${customer.name} with ID ${idHolder} has been update with ${req.body.name}`);

    if (!customer) {
        res.status(404).send("The movie you are trying to update isn't in our database!!!!!!!!!!!!!!");
        return
    }
    

})

router.delete('/:id', auth, async (req, res) =>{
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer){
        res.status(404).send(`${req.body.name} genre isn't present in our database, kindly cross check and try again!!!!!!!!!`);
        return;

    }

    res.send(`${customer.name} has successfully been removed from the courses list`);

})


module.exports = router;