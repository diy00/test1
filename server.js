//tell our app to load env 
//first check if we running in production envt. or not
//process.env.NODE_ENV is set by default by node
//we dont want to load in this envt. variable unless we are in development environment
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express") //import express from express library that we installed npm
const app = express()
const expressLayouts = require("express-ejs-layouts")

//require the file that we just created
const indexRouter = require("./routes/index")
//but we still dont know how to get information from index file because we are not exporting any information

//configure express application
//setup view engine
app.set("view engine", "ejs")
//setup where views are gonna be coming from. in our case we will put inside views directory
app.set("views", __dirname + "/views")
//hookup express layouts. every layout file is need to be put inside layout file, 
//so we dont to duplicate beginning and endding html such as header and footer
app.set("layout", "layouts/layout")
//tell express app that we want to use express layouts
app.use(expressLayouts)
//tell express where public files are gonna be such as style sheet, JS of images
app.use(express.static("public"))

//import mongoose. (first install library for mongodb using npm i mongoose in terminal)
const mongoose = require("mongoose")
//setup connection for database. 
//pass string for url that will come from environment variables, option for how to setup mongodb inside 
//our application. mongoose uses older way of accessing data in mongoDB which is deprecated currently in mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//but our app does not have variable for database url.
//we will use library dotenv that will allow us to load environment variables into our app.
//npm i --save-dev dotenv

//log if we are or are not connected to our database
const db = mongoose.connection
//if we get error we print out the error
db.on("error", error => console.error(error))

//print when open database for first time
db.once("open", () => console.log("Connected to Mongoose"))


//tell it the root path this is coming from and tell it what router we want to handle with that route
app.use("/", indexRouter)


//tell our app to listen on certain port
//pull from environment variable, for when we deploy , server is gonna tell us what port it is listening to, not us
//but for development we will default this to 3000
app.listen(process.env.PORT || 3000)