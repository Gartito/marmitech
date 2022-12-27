const routes = [
    {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
    },
    {
        path: "/cardapio",
        component: () => import("pages/IndexPage.vue"),
    },
    {
        path: "/login",
        component: () => import("pages/loginPage.vue"),
    },
    {
        path: "/logout",
        component: () => import("pages/logoutSuccess.vue"),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
