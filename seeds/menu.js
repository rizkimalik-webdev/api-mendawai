exports.seed = function (knex) {
    return knex('menu_modul').del()
        .then(function () {
            return knex('menu').insert([
                {
                    menu_name: "Dashboard",
                    number: 1,
                    path: null,
                    icon: null,
                    is_root: true
                },
                {
                    menu_name: "Master Data",
                    number: 2,
                    path: null,
                    icon: null,
                    is_root: true
                },
                {
                    menu_name: "Customers",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: false
                },
                {
                    menu_name: "Todolist",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: false
                },
                {
                    menu_name: "Channels",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: true
                },
                {
                    menu_name: "Ticket",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: true
                },
                {
                    menu_name: "Management User",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: true
                },
                {
                    menu_name: "Settings",
                    number: 0,
                    path: null,
                    icon: null,
                    is_root: true
                }
            ]);
        });
}