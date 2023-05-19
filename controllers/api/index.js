const router = require('express').Router();
const userRoutes = require("../api/userRoutes")

// const Routes = require('./');

router.use('/users', userRoutes);


module.exports = router;
