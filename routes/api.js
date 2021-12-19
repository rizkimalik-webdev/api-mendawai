'use strict';
// const { auth_jwt } = require('../middleware');
const mail = require('../controller/mail_controller');
const auth = require('../controller/auth_controller');
const menu = require('../controller/menu_controller');
const user = require('../controller/users_controller');
const { facebook, twitter, instagram } = require('../controller/hooks');
const { list_customers } = require('../controller/sosmed_controller');
const { blending } = require('../controller/blending_controller');

module.exports = function (app) {
    app.route('/').get(function (req, res) {
        res.json({ message: "Application Mendawai API running! 🤘" });
        res.end();
    });
    app.route('/mail').post(mail.send_mail);
    
    app.prefix('/sosmed', function (api) {
        api.route('/list_customers').get(list_customers);
        api.route('/blending').post(blending);
    });
    
    app.prefix('/menu', function (api) {
        api.route('/').get(menu.menu);
    });

    app.prefix('/auth', function (api) {
        api.route('/login').post(auth.login);
        api.route('/logout').post(auth.logout);
    });

    app.prefix('/user',  function (api) {
        api.route('/').get(user.index);
        api.route('/show/:id').get(user.show);
        api.route('/store').post(user.store);
        api.route('/update').put(user.update);
        api.route('/reset_password').put(user.reset_password);
        api.route('/delete/:id').delete(user.destroy);
    });

    app.prefix('/hooks', function (api) {
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
