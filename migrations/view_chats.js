
const up = function (knex) {
    return knex.raw(`CREATE VIEW view_chats AS 
        SELECT * FROM chats
        union
        select * from chats_end
    `);
};

const down = function (knex) {
    return knex.raw(`DROP VIEW view_chats`);
};

module.exports = { up, down }