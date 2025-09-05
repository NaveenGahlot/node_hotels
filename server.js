const express = require('express')
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
const app = express()

const mongoURl = 'mongodb://127.0.0.1:27017/hotels'
const port = 8080

app.use(express.json());

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

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
