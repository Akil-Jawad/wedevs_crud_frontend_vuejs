<template>
    <v-container v-if="validationErrors">
        <v-alert :type=alert v-for="(value,key) in validationErrors" v-bind:key="key">
            {{value}}
        </v-alert>
    </v-container>
</template>

<script>
export default {
    props:['errors','alert'],
    computed: {
        validationErrors(){
            let errors = Object.values(this.errors);
            errors = errors.flat();
            return errors;
        }
    }
}
</script>

<style>

</style>