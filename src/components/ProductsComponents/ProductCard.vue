<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="400"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="product.image"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            BDT. {{product.price}}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-2"
        style="position: relative"
      >
        <v-card-text class="font-weight-light grey--text pb-0">
          <div>Product ID#{{product.id}}</div>
        </v-card-text>
        <v-card-title class="display-1 orange--text m-2 pt-0 pb-0">{{product.title}}</v-card-title>
        
      <!-- <v-card-text class="font-weight-light title mb-2">
        <div>{{product.price}}</div>
      </v-card-text> -->
      
      <v-card-actions>
        <v-btn
          color="orange"
          dark
          fab
          small
          @click="editProductDialog = !editProductDialog"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>

        <v-btn
          color="red"
          dark
          fab
          small
          @click="deleteSingleProduct"
        >
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          fab
          dark
          small
          color="blue"
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text class="font-weight-light text m-2 p-0">
          <div>{{product.description}}</div>
        </v-card-text>
      </div>
    </v-expand-transition>
      <EditProductModal v-bind:dialog="editProductDialog" v-bind:product_details="product" @closeEditProductDialog="closeEditProductDialog"/>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
  import EditProductModal from "../../components/ProductsComponents/EditProductModal" 
  // import { mapActions } from "vuex";
  export default {
      props:['product'],
      components:{
        EditProductModal
      },
      data: () => ({
      // show: false,
        editProductDialog: false,
        show:false,
      }),
      methods:{
      // ...mapActions(["getProducts", "deleteProduct", "updateProduct"]),
        closeEditProductDialog(close){
            this.editProductDialog = close;
        },
        editSingleProduct(){

        },
        deleteSingleProduct(){
          this.$swal({
            title: 'Are you sure you want to delete ' + this.product.title + '?',
            text: "Product will be deleted permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
          }).then((result) => {
            if (result.value) {
              // console.log(result);
              // this.deleteProduct(this.product.id);
              this.$store.dispatch("deleteProduct",this.product.id)
              .then((success)=>{
                this.$swal('Successfully deleted', success.message , 'success')
              }).catch((error)=>{
                this.$swal('Delete unsuccessful', error , 'success')
              });
            }
          });
        }
    },
  }
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
.v-card__actions{
  padding-left: 12px;
}
</style>
