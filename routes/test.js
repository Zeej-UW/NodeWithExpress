"use strict";
import express from "express";
import session from 'express-session';

const router = express.Router();

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
        res.render('edit-form');
    })
    .post((req, res) => {
        res.send("hi post /test");
    });

router
    .route("/cookieTesting/:id?")
    .get( (req, res) => {
        res.cookie('testCookie', req.params?.id)
            .send(`<p>Cookie Set: <a href="/test/${req.params?.id}">View Here</a>`);
    });

router
    .route("/sessionTesting/:userId?")
    .get( (req, res) => {
        req.session.userId = req.params?.userId;
        res.send('<p>Session Set: <a href="/test/sessionTestEP">Click Me!</a>')
    });

router
    .route("/sessionTestEP")
    .get( (req, res) => {
        res.send(req.session.userId);
        req.session.destroy();
    });

router
    .route("/:testid")
    .get((req, res) => {
        res.clearCookie('testCookie').send(`hi get /test/${req.params.testid}`);
    })
    .put((req, res) => {
        res.send(`hi put /test/${req.params.testid}`);
    });

router
    .route('/submit')
    .post( (req, res) => {
        var id = req.body.id;
        res.redirect(`/test/${id}`);
    });

export default router;
export const test = router;