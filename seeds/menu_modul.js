exports.seed = function (knex) {
    return knex('menu_modul').del()
        .then(function () {
            return knex('menu_modul').insert([
                {
                    menu_id: 2,
                    menu_modul_name: "Category",
                    number: 1,
                    path: '/category1',
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Produk",
                    number: 2,
                    path: '/category2',
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Case",
                    number: 3,
                    path: '/category3',
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Detail",
                    number: 4,
                    path: '/category4',
                    icon: null,
                    is_root: false
                }
            ]);
        });
}