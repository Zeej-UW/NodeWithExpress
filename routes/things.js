"use strict";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`${req.url} @ ${Date.now()}`)
});

router
    .route("cars")
    .get((req, res) => {
        res.send("hi get /things/cars");
    })
    .post((req, res) => {
        res.send("hi post /things/cars");
    });

router
    .route("/cars/:cardid")
    .get((req, res) => {
        res.send("hi get /things/cars" + req.params.cardid);
    })
    .put((req, res) => {
        res.send("hi get /things/cars" + req.params.cardid);
    });

export default router;
export const things = router;