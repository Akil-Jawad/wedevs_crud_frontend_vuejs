import { mapGetters, mapActions } from "vuex";
import ProductCard from "../../components/ProductsComponents/ProductCard"
import AddProductModal from "../../components/ProductsComponents/AddProductModal"
export default {
    name:"ProductList",
    components:{
        ProductCard,
        AddProductModal
    },
    methods:{
        ...mapActions(["getProducts", "addProduct", "deleteProduct","updateProduct"]),
        closeAddProductDialog(close){
            this.addProductDialog = close;
        },
        closeDeleteProductDialog(close){
            this.deleteProductDialog = close;
        }
    },
    computed:{
        ...mapGetters(["allProducts","isLoggedIn"]),
        productExist(){
            if(this.allProducts !== null){
                if(this.allProducts.length>0){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }

    },
    data: () => ({
        addProductDialog: false,
        deleteProductDialog: false,
        showMessage:null,
    }),
    mounted(){
        if(this.isLoggedIn){
            this.$store.dispatch("getProducts")
            .then((success)=>{
                console.log(success);
            }).catch((error)=>{
                if(error.message.response.status===404){
                    // console.log(error.message.response.data.message);
                    this.showMessage = error.message.response.data.message;
                }else{
                    this.$router.push('/').catch(err => (console.log(err)));
                    this.$store.dispatch("clearUserState");
                    this.$store.dispatch("clearProductState");
                }
            });
        }else{
            this.$router.push('/').catch(err => (console.log(err)));
            this.showMessage = null;
        }
    }
    
}