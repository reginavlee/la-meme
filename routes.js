const multer = require('multer');
const AWS = require('aws-sdk');
const router = require('express').Router();
const cors = require('cors');
const controller = require('./app/controllers/index');

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
});

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: {
    fileSize: 52428800
  },
});

router.post('/upload', upload.single('theseNamesMustMatch'), cors(), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  s3.putObject({
    Bucket: 'lameme1',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions  
  }, (err) => {
    if (err) return res.status(400).send(err);
    res.send('File uploaded to S3');
  })
})

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

module.exports = router