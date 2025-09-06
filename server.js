const express = require('express')
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
const app = express() 

require('dotenv').config();
app.use(express.json()); 

const PORT = process.env.PORT || 8080;
const mongoURl = process.env.mongoURl;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(mongoURl);
}

app.get('/jaipur', (req, res)=>{
    res.send('Hello, Jaipur')
}) 

// define route 
app.use('/person', personRoutes);
app.use('/menuitem', menuRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
