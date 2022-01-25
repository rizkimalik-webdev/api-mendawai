const channel = require('./channel_controller');
const status = require('./status_controller');
const user_level = require('./user_level_crontroller');
const category = require('./category_controller');
const categorysublv1 = require('./categorysublv1_controller');
const categorysublv2 = require('./categorysublv2_controller');
const categorysublv3 = require('./categorysublv3_controller');
const organization = require('./organization_controller');

module.exports =  {
    channel,
    status,
    user_level,
    category,
    categorysublv1,
    categorysublv2,
    categorysublv3,
    organization,
}