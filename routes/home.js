"use strict";
import express from "express";
import session from 'express-session';
import path from 'path';

const router = express.Router();
const _dirname = path.resolve(path.dirname(''));

router.use(session(
    {
        secret: "thisisacoolsecret!",
        resave: false,
        saveUninitialized: true
    }
));

router.use((req, res, next) => {
    console.log(`${req.url} @ ${Date.now()}`)
    next();
});

router.use(express.json()); // Used to parse JSON bodies
router.use(express.urlencoded()); //Parse URL-encoded bodies

router
    .route("/")
    .get((req, res) => {
        res.sendFile('index.html', { root: _dirname });
    });

router
    .route("/receiveFile")
    .get( (req, res) => {
        res.sendFile( __dirname + '/index.html');
    });

router
    .route("/home/render")
    .get( (req, res) => {
        res.render('index', 
        {
            title: 'My Title',
            message: 'Hello World (Template)'
        });
    });

router
    .route("/sessionTestEP")
    .get( (req, res) => {
        res.render('edit-form');
    });

export default router;
export const home = router;
export const __dirname = _dirname;