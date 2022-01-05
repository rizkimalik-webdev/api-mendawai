
const up = function (knex) {
    return knex.schema.alterTable('users', function (table) {
        table.boolean('inbound');
        table.boolean('outbound');
        table.boolean('sms');
        table.boolean('email');
        table.boolean('chat');
        table.boolean('facebook');
        table.boolean('twitter');
        table.boolean('instagram');
        table.boolean('whatsapp');
        table.integer('max_inbound', 10);
        table.integer('max_outbound', 10);
        table.integer('max_sms', 10);
        table.integer('max_email', 10);
        table.integer('max_chat', 10);
        table.integer('max_facebook', 10);
        table.integer('max_twitter', 10);
        table.integer('max_instagram', 10);
        table.integer('max_whatsapp', 10);
        table.integer('max_queue', 10);
        table.integer('max_concurrent', 10);
        table.string('socket_id', 100);
    })

};


const down = function (knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('inbound');
        table.dropColumn('outbound');
        table.dropColumn('sms');
        table.dropColumn('email');
        table.dropColumn('chat');
        table.dropColumn('facebook');
        table.dropColumn('twitter');
        table.dropColumn('instagram');
        table.dropColumn('whatsapp');
        table.dropColumn('max_inbound');
        table.dropColumn('max_outbound');
        table.dropColumn('max_sms');
        table.dropColumn('max_email');
        table.dropColumn('max_chat');
        table.dropColumn('max_facebook');
        table.dropColumn('max_twitter');
        table.dropColumn('max_instagram');
        table.dropColumn('max_whatsapp');
        table.dropColumn('max_queue');
        table.dropColumn('max_concurrent');
        table.dropColumn('socket_id');
    })

};
module.exports = {up, down}