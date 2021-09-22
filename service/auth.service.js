const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { required } = require('joi');
const { db } = require('../mongo');
const { response } = require('express');
const regschema = joi.object ({
    cname: joi.string().required(),
    startTime: joi.string().required(),
    endTime: joi.string().required(),
    hours: joi.number().integer().required(),
    date: joi.string().required(),
    status: joi.required(),
    hall: joi.string().required(),
});
const service = {
    async register(data,res) {
        const {error} = regschema.validate(data);
        if(error) {
            return res.send({error: error.details[0].message});
        }
       const user = await this.findUserEmail(data.hall);
       if(user) {return res.status(400).send({error:"hall already exist"})}
       console.log(data,"mongo");
       await mongo.db.collection('customer').insertOne(data);
       res.send({message:"successfully booked"})
    },
    async hallInfo(data,res) {
        mongo.db.collection("hl").find({}).toArray((err,result)=>{
            if(err) throw err
            res.send(result);
        })
    },
    async updateData(data,res) {
        let hal = data.movie;
        await mongo.db.collection('hl').updateOne({movie:hal},{$set : {status:"booked"}}, { upsert: true });
        res.send({message:"successfully updates"});
    },
    async customerData(data,res) {
         mongo.db.collection("customer").find({}).toArray((err,result)=>{
             if(err) throw err
             res.send(result);
         })
     }, 
    findUserEmail(hall) {
        return mongo.db.collection("customer").findOne({hall});
    },
} 
   module.exports = service;