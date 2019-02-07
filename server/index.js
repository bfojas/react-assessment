const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

let editData = {}

app.put('/edit', (req,res)=>{editData = req.body
    res.status(200).json(editData)
    })

app.get('/get', (req,res)=>{
    res.status(200).json(editData)
})


const PORT=4000;
app.listen(PORT, ()=>console.log(`server on ${PORT}`));