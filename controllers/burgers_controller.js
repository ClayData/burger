var express = require("express");

var router = express.Router();

const burger = require("../models/burger");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    })
});

router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    })
})

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        {
            burger: req.body.devoured
        },
        condition,
        function(result) {
            if (result.devoured === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
})

module.exports = router;