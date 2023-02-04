const express = require('express')
const app = express()
const mongoose = require('./mongoConnect')
const Student = require('./Models/student')

app.use(express.json())

// All student data
app.get('/',async (req,res)=>{
    const exist = await Student.find({})
    res.json({msg:"Request success",data:exist})
})
// Delete By id
app.post('/students/:id',async (req,res)=>{
    const {id} = req.params;
    const exist = await Student.find({_id:id});
    if(exist){
        await Student.deleteOne({_id:id})
      res.json({msg:"Deleted Successfully"})
    }else{
        res.json({msg:"Invalid Id"})
    }
})
// Update By id
app.post('/students/:id/update',async (req,res)=>{
    const {id} = req.params;
    const {Student_name,Student_class,Student_roll} = req.body;
    const exist = await Student.find({_id:id});
    if(exist){
        await Student.updateOne({_id:id},{$set: {name: Student_name,class:Student_class,roll:Student_roll}})
      res.json({msg:"Updated Successfully"})
    }else{
        res.json({msg:"Invalid Id"})
    }
})
// Get By Id
app.get('/students/:id',async (req,res)=>{
    const {id} = req.params;
    const exist = await Student.findById(id);
    if(exist)
    {
        res.json({msg:"Request Successfull",data:exist})
    }else{
        res.json({msg:"Request Unsuccessfull"})

    }
})
// Delete All
app.post('/students/delete',async (req,res)=>{
    await Student.deleteMany({});
    res.json({msg:"All student data deleted"});
})

// Adding new student data
app.post('/students',async (req,res)=>{
    const {Student_name,Student_class,Student_roll} = req.body;
    const exist = await Student.find({roll:Student_roll,name:Student_name})
    if(exist && exist.length>0){
        res.json({msg:"Student data already exists"})
    }
    else{
        const newStudent = await Student.create({
            name : Student_name,
            class : Student_class,
            roll : Student_roll
        })

        await newStudent.save();
        res.json({msg:"Student data saved"})
    }
})

app.listen(3000,()=>{
    console.log('Server up!');
})