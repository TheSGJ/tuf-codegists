const express = require('express');
const prisma = require('../db');
const { body, validationResult, oneOf } = require("express-validator");
const router = express.Router();

router.post('/new', [
    body("code")
        .trim()
        .notEmpty()
        .withMessage("code snippet is required"),
    body("lang").notEmpty()
        .withMessage("language selection is required"),
    body("username")
        .trim().notEmpty()
        .withMessage("Username is required")
], async (req, res) => {
    const { username, lang, code } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let submission = await prisma.code.create({
            data: {
                username,
                lang,
                code
            }
        })
        res.status(201).json(submission)
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});

router.get('/list', async (req, res) => {
    try {
        const list = await prisma.code.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        res.json(list)
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});

module.exports = router;