import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const user_signup_schema = new mongoose.Schema({
fullname: {type: String, required: true, maxLength: 25, minLength: 5},
email: {type: String, required: true, minLength: 5, maxLength: 255, unique: true},
password: {type: String, required: true,  maxLength: 255},
is_verfied:  {type:  Boolean, default: false}, 
day_care_owner: {type: Boolean, default: false}
}, {
methods:  {
generateAuthToken: function(){
let token = jwt.sign({_id: this._id}, process.env.DAYCARE_PRIVATE_KEY as string) 
return token
}
}
})

const user_signup_model = mongoose.model("child-care-accounts", user_signup_schema)
export default user_signup_model
