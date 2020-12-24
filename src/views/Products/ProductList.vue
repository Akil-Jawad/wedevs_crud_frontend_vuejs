<template>
  <v-container>
    <!-- <h1>Products</h1> -->
    <v-container class="products" v-if="productExist">
      <v-row no-gutters>
        <v-col cols="12" md="3" class="product" :key="product.id" v-for="product in allProducts">
          <ProductCard :product="product"/>
        </v-col>
      </v-row >
    </v-container>
    <v-container class="products" v-if="!productExist">
      <v-alert v-if="showMessage" type="info">{{showMessage}}</v-alert>
    </v-container>
    <v-fab-transition>
      <v-btn
        fab
        color="success"
        bottom
        right
        fixed
        @click="addProductDialog = !addProductDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <AddProductModal v-bind:dialog="addProductDialog" @closeAddProductDialog="closeAddProductDialog"/>
  </v-container>
</template>

<script src="./productList.js"></script>

<style src="./productList.css"></style>