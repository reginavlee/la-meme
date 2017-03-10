const router = require('express').Router();
const controller = require('./app/controllers/index');

/*
 * {Client} Routes
 */

/*
 * {Meme} API Routes
 */
router.get('/api/meme', controller.meme.get);

module.exports = router;