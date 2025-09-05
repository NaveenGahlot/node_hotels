const express = require('express')
const route = express.Router();
const MenuItem = require("./../models/MenuItem");


// POST route to add a MenuItem 
route.post("/", async (req, res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved'); 
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({err:- "Internal Server Error"});
    }
})

// GET method to get the person 
route.get("/", async (req, res)=>{
    try{
        const data = await MenuItem.find()
        console.log('data saved')
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({err:- "Internal Server Error"})
    }
})

route.get('/:tasteType', async (req, res)=>{
    try {
        const tasteType = req.params.tasteType; // Extract the work type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){ 
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetch');
            res.status(200).json(response);
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
        const menuitemId = req.params.id; // Extract the id from the URL parameter
        const updateMenuData = req.body; // Updated data for the menu item
        const response = await MenuItem.findByIdAndUpdate(menuitemId, updateMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose Validation 
        });
        if (!response) {
            return res.status(404).json({ error: 'MenuItem not found' });
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
        const menuitemId = req.params.id; // Extract the id from the URL parameter
        const response = await MenuItem.findByIdAndDelete(menuitemId); // Assuming you have a Person model
        if (!response) {
            return res.status(404).json({ error: 'MenuItem not found' });
        }
        console.log('data deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = route;