const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const YoutubeController = require('../controllers/YouTubeController');

const routes = [
    { method: 'GET', path: '/users', controller: UserController.getUser },
    { method: 'GET', path: '/captions', controller: YoutubeController.getVideoCaptions },
    { method: 'POST', path: '/login', controller: LoginController.login },
    { method: 'POST', path: '/videos', controller: YoutubeController.getVideosList },
    { method: 'GET', path: '/oauth2callback', controller: YoutubeController.handleOAuthCallback}



];

module.exports = routes;