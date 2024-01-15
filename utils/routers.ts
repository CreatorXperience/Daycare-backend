import { Application } from "express";
import express from "express";
import signup from "../routes/signup"
import auth from "../routes/auth"
import verify_email from "../routes/verify-otp"
import create_profile from "../routes/create-childcare-profile"
import error from "../middlewares/error";
import child_care_location from "../routes/get-childcares"
import seach_childcares from "../routes/search-childcares"
import favorite from "../routes/favorites"



const Router = (app: Application)=>{
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signup)
app.use("/auth", auth)
app.use("/verify-email", verify_email)
app.use("/create-profile",create_profile)
app.use("/locate-childcares", child_care_location)
app.use("/search-childcares", seach_childcares)
app.use("/favorite", favorite)


app.get('/', (req,res)=>{
  res.send("Welcome to this API")
})

app.use(error)
}

export default Router
