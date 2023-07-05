const router = require("express").Router();
//Handlers
const { signupHandler } = require("../handlers/signUp")
const { loginHandler } = require("../handlers/logIn")
const { attachCharacterHandler } = require("../handlers/attachCharacter")
//Routes for handlers
router.post("/signup", signupHandler)
router.get("/signin", loginHandler)
router.post("/character", attachCharacterHandler)

module.exports = router;