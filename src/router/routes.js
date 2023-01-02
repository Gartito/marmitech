const routes = [
    {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        component: () => import("pages/loginPage.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: "/logout",
        component: () => import("pages/loginPage.vue"),
        beforeEnter(to, from, next) {
            const token = localStorage.getItem('jwt_token_marmitech_session');
            if (token != null) {
                localStorage.removeItem('jwt_token_marmitech_session');
            }
            next();
        },
        meta: { requiresAuth: false }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
        meta: { requiresAuth: false }
    },
];

export default routes;
