const router = require("express").Router();
//Handlers
const { signupHandler } = require("../handlers/signUp")
const { loginHandler } = require("../handlers/logIn")

//Routes for handlers
router.post("/signup", signupHandler);
router.get("/signin", loginHandler)

module.exports = router;