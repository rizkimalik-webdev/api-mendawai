exports.seed = function (knex) {
    return knex('menu_modul').truncate()
        .then(function () {
            return knex('menu_modul').insert([
                /* dashboard */
                {
                    menu_id: 1,
                    menu_modul_name: "Ticket",
                    number: 0,
                    path: '/dash_ticket',
                    icon: null,
                    is_root: false
                },{
                    menu_id: 1,
                    menu_modul_name: "Sosial Media",
                    number: 0,
                    path: '/dash_sosmed',
                    icon: null,
                    is_root: false
                },{
                    menu_id: 1,
                    menu_modul_name: "Sentiment",
                    number: 0,
                    path: '/dash_sentiment',
                    icon: null,
                    is_root: false
                },
                /* master data */
                {
                    menu_id: 2,
                    menu_modul_name: "Category",
                    number: 1,
                    path: '/category1',
                    icon: null,
                    is_root: false
                },{
                    menu_id: 2,
                    menu_modul_name: "Category Produk",
                    number: 2,
                    path: '/category2',
                    icon: null,
                    is_root: false
                },{
                    menu_id: 2,
                    menu_modul_name: "Category Case",
                    number: 3,
                    path: '/category3',
                    icon: null,
                    is_root: false
                },{
                    menu_id: 2,
                    menu_modul_name: "Category Detail",
                    number: 4,
                    path: '/category4',
                    icon: null,
                    is_root: false
                },

                /* modul channels */
                { 
                    menu_id: 5,
                    menu_modul_name: "Inbound",
                    number: 0,
                    path: '/channel_inbound',
                    icon: null,
                    is_root: false
                },{ 
                    menu_id: 5,
                    menu_modul_name: "Email",
                    number: 0,
                    path: '/channel_email',
                    icon: null,
                    is_root: false
                },{ 
                    menu_id: 5,
                    menu_modul_name: "Social Media",
                    number: 0,
                    path: '/channel_socmed',
                    icon: null,
                    is_root: false
                },

                /* modul ticket */
                { 
                    menu_id: 6,
                    menu_modul_name: "Create Ticket",
                    number: 0,
                    path: '/ticket_create',
                    icon: null,
                    is_root: false
                },{ 
                    menu_id: 6,
                    menu_modul_name: "History Ticket",
                    number: 0,
                    path: '/ticket_history',
                    icon: null,
                    is_root: false
                },
                
                /* modul setting */
                { 
                    menu_id: 7,
                    menu_modul_name: "Management User",
                    number: 0,
                    path: '/user',
                    icon: null,
                    is_root: false
                },{ 
                    menu_id: 7,
                    menu_modul_name: "Subcription",
                    number: 0,
                    path: '/subcription',
                    icon: null,
                    is_root: false
                },
            ]);
        });
}