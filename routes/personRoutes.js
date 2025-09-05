const express = require('express')
const route = express.Router();
const Person = require('./../models/Person')

// POST route to add a person 
route.post('/', async (req, res)=>{ 
    try{
        const data = req.body // Assuming the request body contains the person data
    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);
    // Save the new person to the database
    const response = await newPerson.save()
    console.log('data saved');
    res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({err:- "Internal Server Error"});
    }
})

// GET method to get the person 
route.get('/', async(req, res)=>{
    try{
        const data = await Person.find()
        console.log('data saved');
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({err:- "Internal Server Error"});
    }
})


route.get('/:workType', async (req, res)=>{
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType})
            console.log('response fetch')
            res.status(200).json(response)
        }else{
            res.status(404).json({error:- 'Internal wrk type'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:- "Internal Server Error"})
    }
})


route.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatePersonData = req.body // Updated data for the person 

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose Validation 
        });
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = route;