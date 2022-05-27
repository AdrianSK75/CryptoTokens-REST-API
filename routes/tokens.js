const express = require('express');
const router = express.Router();
const Token = require("../models/token")

// Getting All Tokens
router.get("/", async (req, res) => {
    try {
        const tokens = await Token.find();
        res.json(tokens)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})
// Getting One Token
router.get("/:id", getToken, (req, res) => {
    res.json(res.token)
})
// Add a token
router.post('/add-token', async (req, res) => {
    const token = new Token({
      name: req.body.name,
      value: req.body.value,
      tradable: req.body.tradable
    })
    try {
      const newToken = await token.save()
      res.status(201).json(newToken)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})
// Update Token
router.patch("/update/:id", getToken, async (req, res) => {
    if (req.body.name != null) {
            res.token.name = req.body.name
    }
    if (req.body.value != null) {
            res.token.value = req.body.value
    }
    if (req.body.tradable != null) {
        res.token.tradable = req.body.tradable
    }
    try {
        const updatedToken = await res.token.save();
        res.json(updatedToken)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete Token
router.delete("/delete/:id", getToken, async (req, res) => {
    try {
        await res.token.remove()
        res.json({ message: "Deleted Token" })
    } catch(error) {
        res.status(500).json({ message: err.message })
    }
})
async function getToken(req, res, next) {
    let token;
    try {
        token = await Token.findById(req.params.id)
        if (token == null) {
                return res.status(400).json({ message: "Cannot find the token" })
        }
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }

    res.token = token;
    next();
}

module.exports = router;