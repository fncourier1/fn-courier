const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* DASHBOARD */
router.get("/dashboard", (req, res) => {
  db.all("SELECT * FROM shipments ORDER BY id DESC", (err, rows) => {
    res.render("admin/dashboard", { shipments: rows });
  });
});

/* SHOW CREATE FORM */
router.get("/create", (req, res) => {
  res.render("admin/create");
});

/* SAVE SHIPMENT */
router.post("/create", (req, res) => {

  const t = "FN" + Date.now(); // auto tracking

  const s = req.body;

  db.run(`
  INSERT INTO shipments
  (tracking,sender_name,sender_phone,sender_address,
   receiver_name,receiver_phone,receiver_address,
   description,weight,amount,status)
  VALUES(?,?,?,?,?,?,?,?,?,?,?)
  `,
  [
    t,
    s.sender_name,
    s.sender_phone,
    s.sender_address,
    s.receiver_name,
    s.receiver_phone,
    s.receiver_address,
    s.description,
    s.weight,
    s.amount,
    "Pending"
  ]);

  res.redirect("/admin/dashboard");
});

/* RECEIPT */
router.get("/receipt/:id", (req, res) => {

  db.get("SELECT * FROM shipments WHERE id=?",
  [req.params.id],
  (err,row)=>{
    res.render("admin/receipt",{s:row});
  });

});

module.exports = router;
