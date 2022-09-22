const express = require("express");
const app = express();
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");
const path = require("path");
const collection = require("../src/models/registers");
const pathjoin = path.join(__dirname, "../public");
const temp_path = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 5000;
const CryptoJS=require('crypto-js')
// const handlebars = require('hbs')
// {{!-- in patials we save the file that willl be use same in different files --}}

require("./db/conn");
////////////to get form data///////////////////
app.use(express.urlencoded({ extended: false }));
/////////////////////////
app.use(express.json());
//static page
app.use(express.static(pathjoin));
/////////////////////////////
////////////VIEW
app.set("view engine", "hbs");
app.set("views", temp_path);
////////////////////////////
////////////////////////////////////////////////partials////////////
hbs.registerPartials(partials);
///////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("index");
});
/////////////////////////////////login
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login",async(req,res)=>{
   try {
    const checkuser=await collection.findOne({
        email:req.body.email,
        password:req.body.password
    })

if(!checkuser){
    res.status(400).send("sorry you arenot allowed")

}
res.status(200).render("succes")
   } catch (error) {
    res.status(500).json(error)
   }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/signup", (req, res) => {
  res.render("signup");
});
//inserting user to db
app.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const user = await new collection({
        firstName: req.body.firstName,
        lastname: req.body.lastname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
  
      password:req.body.password,
      cpassword:req.body.cpassword,
      });
      await user.save();
      res.status(200).render("login");
    } else {
      res.send("password and confirm password doesnt match");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.listen(port, () => {
  console.log(port);
});
