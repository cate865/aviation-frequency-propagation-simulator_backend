import { Router } from 'express';
const router      =  new Router()
import Receiver from '../models/receiver.js';
import pkg from 'mongoose';
const { find, findOne, findOneAndRemove } = pkg;
import { ObjectId } from 'mongodb';


//Create a receiver
router.post('/',async (req,res) => {
    const receiver =  new Receiver({
        ...req.body
    })
    try {
        await receiver.save()
        res.status(201).send({message:"Receiver created succesfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get all receivers
router.get("/", async (request, response) => {
  const receivers = await Receiver.find({});

  try {
    response.send(receivers);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Get a given product given the id of the product
router.get('/delete/:id', async (req,res) => {
    const _id =  req.params.id
   
    if (!ObjectId.isValid(_id)) {
        return res.status(404).send({error:"Invalid parameter"});
    }
    try {
        const receiver = await Receiver.findOneAndRemove({ _id})
        if(!receiver){
            return res.status(404).send({error:"Receiver not found"})
        }
        res.status(200).send({message: "Receiver removed"});

    } catch (error) {
        res.status(500).send()
    }
})


export default router