require("dotenv").config();
const express = require("express");
const apiip = require("apiip.net")(process.env.IPAPIKEY);
const cors = require("cors");

const app = express();

app.use(cors({optionsSuccessStatus:200}));
app.use(express.static(__dirname + "/files"));


// Get Requsets
app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/api/whoami", (req,res)=>{
  const info = {
     ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  }
  res.json(info);
})

app.get("/getippage", (req,res)=>{
  res.sendFile(__dirname+"/files/getIP.html");
})

app.get("/getipinfo/:ip", (req,res)=>{
  const ipaddress = req.params.ip;
  console.log(ipaddress)
  apiip
  .getLocation({
    ip: ipaddress, 
    output: 'json',
    languages: 'es',
  })
  .then((results) =>{
    console.log(results)
     res.json(results)
    })
    .catch(err=>{
      res.json(err)
    })
})

app.listen(80, () => {
  console.log("Server is running at port 80")
}) 