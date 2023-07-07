const router = require("express").Router();
//Handlers
const { signupHandler } = require("../handlers/signUp")
const { loginHandler } = require("../handlers/logIn")
const { attachCharacterHandler } = require("../handlers/attachCharacter")
const { verifyCharacter } = require("../handlers/characterSearch")
//Routes for handlers
router.post("/signup", signupHandler)
router.get("/signin", loginHandler)
router.post("/character", attachCharacterHandler)
router.get('/characters/verify', verifyCharacter)


module.exports = router;