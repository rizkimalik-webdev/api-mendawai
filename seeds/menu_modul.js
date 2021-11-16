exports.seed = function (knex) {
    return knex('menu_modul').del()
        .then(function () {
            return knex('menu_modul').insert([
                {
                    menu_id: 2,
                    menu_modul_name: "Category",
                    number: 1,
                    path: null,
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Produk",
                    number: 2,
                    path: null,
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Case",
                    number: 3,
                    path: null,
                    icon: null,
                    is_root: false
                },
                {
                    menu_id: 2,
                    menu_modul_name: "Category Detail",
                    number: 4,
                    path: null,
                    icon: null,
                    is_root: false
                }
            ]);
        });
}