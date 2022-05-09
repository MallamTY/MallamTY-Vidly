const validateObjectId = require('../middlewares/validateObjectId');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const {Genre, validate} = require('../model/genre');
const { Router } = require('express');
const express = require('express');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router();




router.get('/', async(req, res, next) =>{
    //throw new Error('Could not get genres from the database');

    const genre = await Genre.find();
    res.send(genre);
    
    
});


router.get('/:id', validateObjectId, async(req, res) =>{

    const genre = await Genre.findById(req.params.id);
    res.send(genre);

    if(!genre){
        res.status(404).send("The genre of movies you are looking for is currently not available. Do well to check back later");
        return;
    }

    
});

router.post('/',auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    // const genre = genres.find(finderfunction => finderfunction.name === req.body.name);
    // if (genre) return res.status(400).send(`${genre.name} already exist in the database!!!!!!!!!!!!!`);
        
        
    
        let genre = new Genre ({name : req.body.name});   
        genre = await (genre.save());
        res.send(`${genre.name} has successfully been added to the database!!!!!!!!!!!!!!!!`);

});


router.put('/:id',auth, async(req, res) =>{
    
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;

    }

    idHolder = req.params.id;
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name})
    res.send(`The ${genre.name} with ID ${idHolder} has been update with ${req.body.name}`);

    if (!genre) {
        res.status(404).send("The movie you are trying to update isn't in our database!!!!!!!!!!!!!!");
        return
    }
    

})

router.delete('/:id', [auth, admin], async (req, res) =>{
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if(!genre){
        res.status(404).send(`Genre with ID ${req.params.id} isn't present in our database, kindly cross check and try again!!!!!!!!!`);
        return;

    }

    res.send(`${genre.name} has successfully been removed from the courses list`);

})


module.exports = router;