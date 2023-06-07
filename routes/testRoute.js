const router = require('express').Router();
const path   = require('path');

router.route('/')
    .get((req, res) => { res.sendFile(path.join(__dirname, '../views/test.html'));} )
    .post((req, res) => { res.send("asdasdasd"); });


module.exports = router;