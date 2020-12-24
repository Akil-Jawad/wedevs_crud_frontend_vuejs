<template>
  <v-card class="px-4">
    <v-card-text>
        <v-form ref="registerForm" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="userName" :rules="[rules.required]" label="Username" maxlength="20" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="[rules.required,rules.email]" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field block v-model="confirmPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show2 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show2 = !show2"></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import {auth_url} from "../../urls/urls";

export default {
    name:"Register",
    computed: {
    passwordMatch() {
            return () => this.password === this.confirmPassword || "Password must match";
        }
    },
     methods: {
        validate() {
            if (this.$refs.registerForm.validate()) {
                let self = this;
                const payload = {
                    name: this.userName,
                    email: this.email,
                    password: this.password,
                }
                axios.post(auth_url + "/register", payload)
                    .then(response => {
                        if(response.status === 200){
                            // console.log(response.data.message);
                            self.$emit('getMessageFromRegistration',response.data.message,'success',0,false);
                            this.reset();
                            this.resetValidation();
                        }
                    })
                    .catch(error => {
                    if(error.response.status == 422){
                        // console.log(error.response.data.errors);
                        this.validation_errors = error.response.data.errors;
                        self.$emit('getMessageFromRegistration', this.validation_errors,'error',1,true);
                    }else{
                        // console.log(error.response.data.error);
                        // console.log(error.response.status);
                        self.$emit('getMessageFromRegistration', error.response.data.error,'error',1,false);
                    }
                });
            }
        },
        reset() {
            this.$refs.registerForm.reset();
        },
        resetValidation() {
            this.$refs.registerForm.resetValidation();
        }
    },
    data: () => ({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",

        validation_errors : null,
        valid: true,
        show1: false,
        show2: false,
        rules: {
          required: value => !!value || "Required.",
          min: value => (value && value.length >= 8) || "Min 8 characters",
          email: value => /.+@.+\..+/.test(value) || "E-mail must be valid"
        }
    })
}
</script>

<style scoped>

</style>