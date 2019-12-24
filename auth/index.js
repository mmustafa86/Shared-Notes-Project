const express = require("express");
const router = express.Router();
//route paths are prepended with /auth
router.get('/', function (req, res) {
    res.json({
        message: 'test'
    });
})



router.post('/signup', function (req, res) {
    res.json({
        message: 'signup'
    });
})

module.exports = router;