const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req,res)=> res.render("home"));

router.get("/about", (req,res)=> res.render("about"));

router.get("/track",(req,res)=> res.render("track",{shipment:null}));

router.post("/track",(req,res)=>{
  db.get("SELECT * FROM shipments WHERE tracking=?",[req.body.tracking],
  (e,row)=> res.render("track",{shipment:row}));
});

module.exports = router;
