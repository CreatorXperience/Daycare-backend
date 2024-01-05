import express from "express"
import Joi from "joi"
import Otp_model from "../models/otp-model"


const router =  express.Router()


let otpValidation = (otpPayload: {otp: string})=>{
    let otpSchema = Joi.object({
        otp: Joi.string().required().min(4).max(4)
    })

  return otpSchema.validate(otpPayload)
}
router.post("/", async(req,res)=>{
    let {error} = otpValidation(req.body)
    if(error){
        return res.status(404).send({message: error.details[0].message})
    }
    let getOtp = await Otp_model.findOne({otp: req.body.otp})
    if(!getOtp){
        return res.status(404).send({message: "otp expired, request a new one"})
    }
    
})