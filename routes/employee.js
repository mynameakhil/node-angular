const express = require('express');
const router=express.Router()
const Employee =require('../models/employee')

router.get('/',async(req,res)=>{
    try{
        const employees = await Employee.find()
        res.json(employees)
    }
    catch(err){
        console.log("error happen",err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        res.json(employee)
    }
    catch(err){
        console.log("error happen",err)
    }
})

router.post('/',async(req,res)=>{
    try{
        const employee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        })
        let emp= await employee.save();
        res.json(emp)

    }
    catch(err){
        console.log("error happen",err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const emp =await Employee.deleteOne({id:req.params.id})
        res.json(emp)

    }
    catch(err){
        console.log("error happen",err)
    }
})

router.put('/:id',async(req,res)=>{
    try{
        // const abc ={firstName:req.body.firstName,
        //             lastName:req.body.lastName,
        //             age:req.body.age}

        //             const employee = {
        //                 name: 'John Smith',
        //                 position: 'Sales Manager'
        //               };
        //               delete employee.position;

        
    const {_id,__v, ...restEmp} =req.body
        let newValue = {$set:restEmp}
        const emp =await Employee.findOneAndUpdate({_id:req.params.id},newValue).catch((err)=>console.log("err",err))
        res.json(emp)

    }
    catch(err){
        console.log("error happen",err)
    }
})

module.exports=router;
