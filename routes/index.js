'use strict';

const auth = require('../controller/auth_controller');
const menu = require('../controller/menu_controller');
const user = require('../controller/users_controller');

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

}
