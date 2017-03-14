const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));

// const redisClient = redis.createClient();
// redisClient.on('connect', () => {
//   console.log('redis connected');
// });


module.exports = redis;
