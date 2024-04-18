const express = require("express")
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())
const port = 8080
const User = mongoose.model('User' , 
{name:String,
 email:String,
 password:String,
 hospital:String,
 endereco:String,
 crm:Number,
 cpf:Number
});

app.put("/:id", async(req, res) =>{
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        hospital: req.body.hospital,
        endereco: req.body.endereco,
        crm: req.body.crm,
        cpf: req.body.cpf
    }, {
        new: true
    })
    return res.send(user)
})

app.get("/", async (req, res) =>{
    const users = await User.find()
    res.send(users)
})

app.delete("/:id", async(req,res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.send(user)
})

app.post("/" , async (req, res) =>{
   const user = new User ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    hospital: req.body.hospital,
    endereco: req.body.endereco,
    crm: req.body.crm,
    cpf: req.body.cpf
   })

   await user.save()
   return res.send(user)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://IgorFlores:agua3006@fasthelth.iq0umfk.mongodb.net/?retryWrites=true&w=majority&appName=FastHelth')

    console.log('App Running')
})