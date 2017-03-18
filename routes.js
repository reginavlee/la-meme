const router = require('express').Router();
const cors = require('cors');
const controller = require('./app/controllers/index');

/*
 * {Client} Routes
 */
router.get('/users', controller.users.get);
router.options('/users', cors());
router.post('/users', cors(), controller.users.post);

router.get('/users/:id', controller.users.getById);
// router.post('/join/:roomId', socketController.joinRoom);

/*
 * {Meme} API Routes
 */
router.get('/api/memes', cors(), controller.memes.get);
router.post('/api/memes', controller.memes.post);


/*
 * {Rooms} API Routes
 */
router.get('/api/rooms', controller.rooms.get);
router.post('/api/rooms', controller.rooms.post);
router.get('api/rooms/:roomId', controller.rooms.getById);

module.exports = router;
