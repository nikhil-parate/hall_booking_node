const express = require('express');
const { assert } = require('joi');
const router = express.Router();
const authservice = require("../service/auth.service"); 

router.post('/register',async (req,res)=>{
    await authservice.register(req.body, res);
    console.log(req.body);
})
router.put('/update',async (req,res)=>{
    await authservice.updateData(req.body, res);
    console.log(req.body);
})
router.get('/hall_data',async (req,res)=>{
    await authservice.hallInfo(req.body, res);
    console.log(req.body);
})

router.get('/customer_data',async (req,res)=>{
    await authservice.customerData(req.body, res);
})
module.exports = router;