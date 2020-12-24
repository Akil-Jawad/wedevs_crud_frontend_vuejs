<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-form ref="productModal" v-model="valid">
          <v-card-text>
            <ValidationErrors v-if="validation_errors" v-bind:alert="alert_type" v-bind:errors="validation_errors"/>
            <v-container>
              <v-row v-if="imageShowing" justify="center">
                  <v-img
                    contain
                    :src="imagePreview"
                  >
<!-- @/assets/add-image.png -->
                  </v-img>
              </v-row>
              <v-row>
                <v-file-input 
                  :rules="imageRules" 
                  chips
                  prepend-icon="mdi-camera" 
                  accept="image/png, image/jpeg, image/bmp, image/jpg " 
                  show-size 
                  @change="addImage" 
                  label="Choose an image">
                </v-file-input>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Product Name*"
                    :rules="productNameRules"
                    v-model="product_name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description*"
                    v-model="description"
                    :rules="descriptionRules"
                    type="text"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Price*"
                    type="number"
                    v-model="price"
                    :rules="priceRules"
                    prefix="BDT. "
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="!valid"
              @click="addProduct"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ValidationErrors from "../globals/ValidationErrors"
export default {
    props: {
        dialog:{
            type:Boolean
        }
    },
    components:{
      ValidationErrors
    },
    data: () => ({
    //   modalDialog: this.dialog,
      valid : true,
      imageShowing : false,
      image:null,
      imagePreview:null,
      product_name : "",
      description : "",
      price : "",
      validation_errors:null,
      alert_type:'error',

      productNameRules: [
        value => !!value || 'Product Name is required',
      ],
      imageRules: [
        value => !value || value.size < 2000000 || 'Product image size should be less than 2 MB!',
      ],
      descriptionRules: [
        value => !!value || 'Description is required',
      ],
      priceRules: [
        value => !!value || 'Price is required',
        value => (value && value.length >= 2) || 'Price must be two decimal',
        value => (value && value.length <= 8) || 'Price must be less than eight decimal',
      ],
    }),
    
    methods:{
        closeDialog(e){
            e.preventDefault();
            this.$emit('closeAddProductDialog',false);
            this.resetValidation();
            this.reset();
        },
        addImage(file){
          if(file){
            // this.image = file;
            // console.log(file);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e =>{
              this.imageShowing = true,
              this.imagePreview = e.target.result
              this.image = e.target.result
            }
          }else{
            this.imageShowing = false;
            this.image = null;
            this.imagePreview = null;
          }
          
        },
        reset() {
            this.$refs.productModal.reset();
        },
        resetValidation() {
            this.$refs.productModal.resetValidation();
        },
        addProduct(){
          ///add action dispatch
          if (this.$refs.productModal.validate()) {
            this.$store.dispatch("addProduct",{
              title: this.product_name,
              description: this.description,
              price: this.price,
              image: this.image,
            })
            .then((success)=>{
                // console.log(success);
                this.$emit('closeAddProductDialog',false);
                // this.$store.dispatch("getProducts");
                this.validation_errors = null;
                this.resetValidation();
                this.reset();
                this.$swal(success.message, "You can find your new product in gallery" , 'success')
            }).catch((error)=>{
                // console.log(error.message.response.data.errors);
                this.validation_errors = error.message.response.data.errors;
            });
          }
        }
    },
}
</script>

<style scoped>
.v-image{
  cursor: pointer;
  max-width: 500px;
  min-width: 300px;
  max-height: 400px;
  /* min-height: 200px; */
}

</style>

