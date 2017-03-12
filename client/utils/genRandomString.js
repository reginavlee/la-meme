/**
 * Generates a random authToken (used for testing
 */
const genRandomString = () => Math.floor(Math.random() * 1000000000).toString();

export default genRandomString;
