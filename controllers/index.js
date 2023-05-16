const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.get("/", (req, res) => {
    res.render("homepage");
  });
  
  router.get("/login", (req, res) => {
    res.render("login");
  });
  
  router.get("/profile", (req, res) => {
    res.render("profile");
  });
  
  
  router.get("/join", (req, res) => {
    res.render("join");
  });
  
  
  router.get("/rules", (req, res) => {
    res.render("rules");
  });

module.exports = router;
