var express = require("express");
var router = express.Router();
var model = require("../models/dramaDAO");

router.get("/", function (req, res) {
  model.selectDrama((results) => {
    //res.send(results)
    res.render("dramaList", { title: "My Favorite Drama List", list: results });
  });
});

router.post("/", function (req, res) {
  if (req.body.title && req.body.actor) {
    model.insertDrama(req.body, (results) => {
      res.redirect("/");
    });
  } else {
    res.render("dramaList", { title: "My Favorite Drama List", list: results });
  }
});

module.exports = router;
