const router = require("express").Router();
//Handlers
const { signupHandler } = require("../handlers/signUp")

//Routes for handlers
router.post("/signup", signupHandler);

module.exports = router;