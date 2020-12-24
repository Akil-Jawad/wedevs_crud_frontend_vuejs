import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage/LandingPage.vue";
// import Login from "../views/Authentication/Login.vue";
// import Register from "../components/AuthComponents/Register.vue";
import Auth from "../views/Authentication/Auth.vue";
import ProductList from "../views/Products/ProductList.vue";
import store from "../store/index"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
    },
    {
        path: "/login",
        name: "Auth",
        component: Auth,
    },
    {
        path: "/products",
        name: "ProductList",
        component: ProductList,
        meta:{
            middleware: 'auth'
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to,_,next)=>{
    if (to.matched.some(r => r.meta.middleware)) {
        // console.log(to.meta.middleware);
        const middleware = require(`../middleware/${to.meta.middleware}`);
        if(middleware){
            middleware.default(to,next,store);
        }
    }else{
        next();
    }
})

export default router;
