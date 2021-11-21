'use strict';
// const knex = require('../config/db_connect');
const auth = require('../controller/auth_controller');
const menu = require('../controller/menu_controller');
const user = require('../controller/users_controller');
const { facebook, twitter, instagram } = require('../controller/hooks');

module.exports = function (app) {
    app.route('/').get(function (req, res) {
        res.send("Application Mendawai API running!");
        res.end();
    });

    app.prefix('/menu', function (api) {
        api.route('/').get(menu.menu);
    });

    app.prefix('/auth', function (api) {
        api.route('/login').post(auth.login);
        api.route('/logout').post(auth.logout);
    });

    app.prefix('/user', function (api) {
        api.route('/').get(user.index);
        api.route('/show/:id').get(user.show);
        api.route('/store').post(user.store);
        api.route('/update').put(user.update);
        api.route('/delete/:id').delete(user.delete);
    });

    app.prefix('/webhook', function (api) {
        api.route('/facebook/token').post(facebook.facebook_token);
        api.route('/facebook/messenger').post(facebook.facebook_messenger);
        api.route('/facebook/feed').post(facebook.facebook_feed);
        api.route('/facebook/mention').post(facebook.facebook_mention);

        api.route('/instagram/token').post(instagram.instagram_token);
        api.route('/instagram/feed').post(instagram.instagram_feed);

        api.route('/twitter/token').post(twitter.twitter_token);
        api.route('/twitter/directmessage').post(twitter.twitter_directmessage);
        api.route('/twitter/mention').post(twitter.twitter_mention);
    });

}
