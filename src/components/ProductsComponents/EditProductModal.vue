<template>
  <v-row justify="center" class="dialog_template">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-form ref="editProductModal" v-model="valid">
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
                  v-model="filename"
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
              color="red darken-1"
              text
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="!valid"
              @click="editProduct"
            >
              Edit
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
        },
        product_details:{
            type:Object
        }
    },
    components:{
      ValidationErrors
    },
    data: () => ({
    //   modalDialog: this.dialog,
      valid : true,
      imageShowing : true,
      image:null,
      imagePreview:null,
      filename: null,
      product_name : "",
      description : "",
      price : "",
      product_id:null,
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
    
    created(){
        // this.getProductById()
        // console.log(this.product);
        this.product_id = this.product_details.id,
        this.product_name = this.product_details.title,
        this.description = this.product_details.description,
        this.price = this.product_details.price,
        this.image = this.product_details.image,
        this.imagePreview = this.product_details.image
    },
    methods:{
        closeDialog(e){
            e.preventDefault();
            this.$emit('closeEditProductDialog',false);
            // this.resetValidation();
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
            // this.$refs.editProductModal.reset();
            this.product_id = this.product_details.id,
            this.product_name = this.product_details.title,
            this.description = this.product_details.description,
            this.price = this.product_details.price,
            this.image = this.product_details.image,
            this.imagePreview = this.product_details.image,
            this.filename = null
        },
        resetValidation() {
            this.$refs.editProductModal.resetValidation();
        },
        editProduct(){
          ///add action dispatch
          if (this.$refs.editProductModal.validate()) {
            //   console.log(this.product_id);
            let payload ={
                title: this.product_name,
                description: this.description,
                price: this.price,
                image: this.image,
            }
            this.$store.dispatch("updateProduct",{
                id:this.product_id,
                payload:payload,
            },this.product_id)
            .then((success)=>{
                // console.log(success);
                this.$emit('closeEditProductDialog',false);
                // this.$store.dispatch("getProducts");
                this.validation_errors = null;
                this.resetValidation();
                this.reset();
                this.$swal(success.message, "You can check your product in gallery" , 'success')
            }).catch((error)=>{
                // console.log(error);
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
.dialog_template{
  padding: 0px 0px 0px 0px;
}

</style>

