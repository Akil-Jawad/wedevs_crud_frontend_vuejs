import axios from "axios";
import {product_url} from "../../urls/urls";

const state = {
    products: []
};

const getters = {
    allProducts: (state) => state.products
};

const actions = {
      async getProducts({ commit, rootGetters }) {
        let auth_token = rootGetters.getAuthToken;
        // console.log(auth_token);
        const header = {
          headers:{
            'Authorization':'Bearer ' + auth_token
          }
        }
        // const response = await axios.get(
        //   "http://127.0.0.1:8000/api/all_products",header
        // ).then((success)=>{
        //   console.log(response.data);
        //   commit("getAllProducts", response.data);
        // }).catch((error)=>{
          
        // });
        return new Promise((resolve, reject) => {
          axios
              .get(
                  product_url + "/all_products",
                  header
              )
              .then(({ data, status }) => {
                  if (status === 200) {
                      // console.log(data);
                      commit("getAllProducts", data);
                      resolve({'message':'Product loaded successfully'});
                  }
              })
              .catch(error => {
                  reject({'message': error});
              });
        });
        
      },
    
      async addProduct({ commit,rootGetters }, payload) {
        let auth_token = rootGetters.getAuthToken;
        // console.log(payload);

        const header = {
          headers:{
            'Authorization':'Bearer ' + auth_token,
          }
        }
        return new Promise((resolve, reject) => {
          axios
              .post(
                product_url + "/add_product",
                  payload,header
              )
              .then(({ data, status }) => {
                  if (status === 200) {
                      // console.log(data);
                      const product = {
                          'id': data.id,
                          'title': data.title,
                          'description': data.description,
                          'price': data.price,
                          'image': data.image,
                      }
                      commit("addProduct", product);
                      // console.log(product);
                      resolve({'message':'Product inserted successfully'});
                  }
              })
              .catch(error => {
                  reject({'message': error});
              });
        });
      },
      
    
      async deleteProduct({ commit,rootGetters }, id) {
        let auth_token = rootGetters.getAuthToken;
        // console.log(id);

        const header = {
          headers:{
            'Authorization':'Bearer ' + auth_token,
          }
        }

        return new Promise((resolve, reject) => {
          axios
              .get(
                product_url + `/delete_product/${id}`,header
              )
              .then(({ data, status }) => {
                  if (status === 200) {
                      // console.log(id);
                      commit("removeProduct", id);
                      resolve({'message': data.message});
                  }else{
                      resolve({'message': data.message});
                  }
              })
              .catch(error => {
                  // console.log(error.response.data.error);
                  reject({'error': error});
              });
        });
      },

      async getSelectedProduct({ commit }, id) {
        await axios.get(product_url + `/show_product/${id}`);
    
        commit("selectedProduct", id);
      },
    
      async updateProduct({ commit,rootGetters }, updateObj) {
        let auth_token = rootGetters.getAuthToken;
        // console.log(updateObj.payload);
        // console.log(updateObj.id);

        const header = {
          headers:{
            'Authorization':'Bearer ' + auth_token,
          }
        }

        return new Promise((resolve, reject) => {
          axios
              .post(
                product_url + `/update_product/${updateObj.id}`,
                updateObj.payload,header
              )
              .then(({ data, status }) => {
                  if (status === 200) {
                      // console.log(data);
                      const product = {
                          'id': data.id,
                          'title': data.title,
                          'description': data.description,
                          'price': data.price,
                          'image': data.image,
                      }
                      // console.log(product);
                      commit("updateProduct", product);
                      resolve({'message':'Product updated successfully'});
                  }else{
                      resolve({'message': data.message});
                  }
              })
              .catch(error => {
                  reject({'message': error});
              });
        });
      },

      async clearProductState({ commit }) {
        commit("resetState");
      },
};

const mutations = {
  addProduct:(state,product)=>{
    if(state.products){
      state.products.unshift(product)
    }else{
      // console.log("called")
      state.products=[]
      state.products.push(product)

    }
  },
  getAllProducts:(state, products) => (state.products = products),
  removeProduct: (state, id) =>
    (state.products = state.products.filter((product) => product.id !== id)),
  updateProduct: (state, updatedProduct) => {
    const index = state.products.findIndex((product) => product.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  resetState:(state)=> state.products = []
};

export default {
    state,
    getters,
    actions,
    mutations
};
