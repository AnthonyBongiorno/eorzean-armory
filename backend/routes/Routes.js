const router = require("express").Router();
//Handlers
const { signupHandler } = require("../handlers/signUp");
const { loginHandler } = require("../handlers/logIn");
const { attachCharacterHandler } = require("../handlers/attachCharacter");
const { verifyCharacter } = require("../handlers/characterSearch");
const { searchItems } = require('../handlers/gearSearch');
const{ deleteCharacterHandler } = require('../handlers/deleteCharacterFromUser');
const{ getProfileCharacters } = require('../handlers/getCharacters');
const { addGearToUserHandler } = require('../handlers/gearPost');
const { deleteGearHandler } = require(`../handlers/gearDelete`);
//Routes for handlers
router.post("/signup", signupHandler);
router.post("/signin", loginHandler);
router.get('/character/:id', getProfileCharacters);
router.post("/character", attachCharacterHandler);
router.get('/characters/verify', verifyCharacter);
router.get('/items', searchItems);
router.delete('/characters/delete', deleteCharacterHandler);
router.post('/items/post/:userId/', addGearToUserHandler);
router.delete('/items/delete', deleteGearHandler);
module.exports = router;