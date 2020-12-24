<template>
  <v-container fluid>
    <v-layout class="layout" row wrap>
      <v-flex xs12 class="text-center" mt-5>
        <h1>Hello, I'm Akil Jawad. Welcome to my Product Gallery</h1>
        <strong>**PLEASE READ FIRST BEFORE YOU EXPLORE MY APP**</strong>
        <p>I want to share some core features of my app. It'll help you to understand my project.</p>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-row>
            <v-col cols="6">
              <div class="my_task">
                <div class="task_header">
                  <h3>MY GIVEN TASK</h3>
                  <div class="my_given_task">
                    <br>
                    <div class="task_details">
                      <div>
                        <li><strong>Create a simple CRUD application of the products table.</strong>
                          <ul>
                            <li>The products table has the following columns.</li>
                            <ul>
                              <li>Id</li>
                              <li>Title</li>
                              <li>Description</li>
                              <li>Price</li>
                              <li>Image</li>
                            </ul>
                          </ul>
                        </li>
                      </div>
                      <div>
                        <li><strong>Important Notes.</strong>
                          <ul>
                            <li><i class="far fa-square"></i>Frontend and Backend have to be separated.</li>
                            <li>Use VueJs / React for creating SPA (Single Page Application) Frontend.</li>
                            <li>Use Laravel for Backend.</li>
                            <li>This CRUD application has to be authenticated. Use JWT API authentication.</li>
                          </ul> 
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="feature_of_my_app">
                <div class="task_header">
                  <h3>MY APP OVERVIEW</h3>
                  <br>
                  <div class="app_details">
                   <div>
                      <li><strong>App details</strong></li>
                      <ul>
                        <li>Framework
                          <ul>
                            <li>VueJS for SPA Frontend</li>
                            <li>Laravel for Backend</li>
                          </ul>
                        </li>
                      </ul>
                   </div>
                   <div>
                      <li> <strong>App Features</strong> 
                        <ul>
                          <li>Frontend - VueJS 2
                            <ul>
                              <li>Token based authetication to authenticate user and API requests.</li>
                              <li>Vue middleware to check user is authenticated or not</li>
                              <li>Vuex(Modular method) for managing global state</li>
                              <li>Props,Emit for component communication</li>
                              <li>Vuetify,Vue-Router,Vue-persistent-state,Axios,VueSweetalert2 and so on.</li>
                            </ul>
                          </li>
                        </ul>
                        <ul>
                          <li>Backend - Laravel 7
                            <ul>
                              <li>JWT authentication for authenticate user and API requests.</li>
                              <li>Full CRUD functionality</li>
                              <li>Model and relationship.(Each user has separate product gallery)</li>
                              <li>Form Request validation</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                        
                      
                   </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-flex class="text-center">
                <h3>That's it!!! Let's explore this app.</h3>
                <strong>**First, we have to login to access gallery. There is a login button in the <mark>UPPER RIGHT CORNER</mark> of this landing page. You can also register from same button**.</strong>
              </v-flex>
            </v-col>
          </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./landingPage.js"></script>

<style src="./landingPage.css"></style>