'use strict';

const user_controller = require('./controller/users_controller');

module.exports = function (app) {
    app.route('/').get(function (req, res) {
        res.send("Application Mendawai API running!");
        res.end();
    });

    app.prefix('/user', function (api) {
        api.route('/').get(user_controller.index);
        api.route('/show/:id').get(user_controller.show);
        api.route('/store').post(user_controller.store);
        api.route('/update').put(user_controller.update);
        api.route('/delete/:id').delete(user_controller.delete);
    });

}
