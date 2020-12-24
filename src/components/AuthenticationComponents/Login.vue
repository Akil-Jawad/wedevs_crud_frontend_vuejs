<template>
  <v-card class="px-4">
    <v-card-text>
        <v-form ref="loginForm" v-model=valid lazy-validation>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="[rules.required, rules.email]" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6" xsm="12">
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name:"Login",
    computed: {
    passwordMatch() {
            return () => this.password === this.verify || "Password must match";
        }
    },
     methods: {
        validate() {
            if (this.$refs.loginForm.validate()) {
                let self = this;
                this.$store.dispatch("login",{
                    email: this.loginEmail,
                    password: this.loginPassword,
                }).then((success)=>{
                    // console.log(success);
                    self.$emit('getMessageFromLogin', success.message,'success',false);
                    this.validation_errors = null;
                    this.reset();
                    this.resetValidation();
                    self.$router.push('/products').catch(err => (console.log(err)));
                }).catch((error)=>{
                    if(error.message.response.status == 422){
                        // console.log(error.message.response.data.errors);
                        this.validation_errors = error.message.response.data.errors;
                        self.$emit('getMessageFromLogin', this.validation_errors,'error',true);
                    }else{
                        // console.log(error.message.response.data.error);
                        // console.log(error.message.response.status);
                        self.$emit('getMessageFromLogin', error.message.response.data.error,'error',false);
                    }
                    
                });
            }
        },
        reset() {
            this.$refs.loginForm.reset();
        },
        resetValidation() {
            this.$refs.loginForm.resetValidation();
        }
    },
    data: () => ({
        loginPassword: "",
        loginEmail: "",
        valid: true,

        validation_errors:null,
        show1: false,
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