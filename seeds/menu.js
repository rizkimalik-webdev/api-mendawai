exports.seed = function (knex) {
    return knex('menu').truncate()
        .then(function () {
            return knex('menu').insert([
                {
                    menu_name: "Dashboard",
                    number: 1,
                    path: null,
                    icon: 'layout-4-block',
                    is_root: true
                },
                {
                    menu_name: "Master Data",
                    number: 2,
                    path: null,
                    icon: 'substract',
                    is_root: true
                },
                {
                    menu_name: "Customers",
                    number: 0,
                    path: '/customer',
                    icon: 'user',
                    is_root: false
                },
                {
                    menu_name: "Todolist",
                    number: 0,
                    path: '/todolist',
                    icon: 'clipboard',
                    is_root: false
                },
                {
                    menu_name: "Channels",
                    number: 0,
                    path: null,
                    icon: 'group-chat',
                    is_root: true
                },
                {
                    menu_name: "Ticket",
                    number: 0,
                    path: null,
                    icon: 'ticket',
                    is_root: true
                },
                {
                    menu_name: "Report",
                    number: 0,
                    path: null,
                    icon: 'chart-bar',
                    is_root: true
                },
                {
                    menu_name: "Settings",
                    number: 0,
                    path: null,
                    icon: 'setting',
                    is_root: true
                }
            ]);
        });
}