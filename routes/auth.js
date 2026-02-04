const express = require("express");
const router = express.Router();

router.get("/admin",(req,res)=> res.render("login"));

router.post("/admin",(req,res)=>{
  if(req.body.username==="admin" && req.body.password==="Agu12345$")
  {
    req.session.user=true;
    res.redirect("/admin/dashboard");
  }
  else res.redirect("/admin");
});

module.exports = router;
