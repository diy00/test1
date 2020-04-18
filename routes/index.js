//index route
//set all routes for index for application
const express = require("express")

//get router portion of express variable
const router = express.Router()

//create routes using router variable
router.get("/",(req, res) =>{
    //send basic default response
    //res.send("Hello world")
    //instead of sending some basic text, we want to render our view
    res.render("index")//pass the name of our view i.e. index.ejs file
})
//we have not hooked up our app yet to use this router
//ther server does not know that router exists
//therefore input our router into server

//we have to export this router that we created
module.exports = router