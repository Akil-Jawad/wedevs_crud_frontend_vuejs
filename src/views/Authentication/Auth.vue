<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
            <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i.name">
                    <v-icon large>{{ i.icon }}</v-icon>
                    <div class="caption py-1">{{ i.name }}</div>
                </v-tab>
                <v-tab-item>
                    <v-alert v-if="showRegistrationSuccessMessage" :type=alertType>
                        {{showRegistrationSuccessMessage}}
                    </v-alert>
                    <v-alert v-if="showLoginSuccessMessage" :type=alertType>
                        {{showLoginSuccessMessage}}
                    </v-alert>
                    <v-alert v-if="showLoginErrorMessage" :type=alertType>
                        {{showLoginErrorMessage}}
                    </v-alert>
                    <ValidationErrors v-if="showLoginValidatorErrorMessage" v-bind:alert="alertType" v-bind:errors="showLoginValidatorErrorMessage"/>
                    <Login @getMessageFromLogin="getMessageFromLogin"/>
                </v-tab-item>
                <v-tab-item>
                    <v-alert v-if="showRegistrationErrorMessage" :type=alertType>
                        {{showRegistrationErrorMessage}}
                    </v-alert>
                    <ValidationErrors v-if="showRegistrationValidatorErrorMessage" v-bind:alert="alertType" v-bind:errors="showRegistrationValidatorErrorMessage"/>
                    <Register @getMessageFromRegistration="getMessageFromRegistration"/>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-dialog>
</template>

<script src="./auth.js"></script>

<style src="./auth.css"></style>

