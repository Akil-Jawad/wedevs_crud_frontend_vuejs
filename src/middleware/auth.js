export default function(to,next,store){
    if(!store.getters.isLoggedIn){
        next('/login');
    }else{
        if (to.path !== '/products') {
            next("/products");
        } else {
            next();
        }
        
    }
}