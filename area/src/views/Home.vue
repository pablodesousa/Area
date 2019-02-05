<template>
    <div>
        <div v-if="authenticated">
            <h4>
                You are logged in !
            </h4>
        </div>
        <div v-if="!authenticated">
            &nbsp;
            <h4 align="center">
                You are not logged in! Please <a @click="auth.login()" style="color: brown">Log In</a> to continue.
            </h4>
            &nbsp;
            <img src="../assets/prohibition_NO_ACCESS_AUTHORISED_PERSONNEL_ONLY.jpeg" class="center"></img>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        props: ['auth', 'authenticated'],
        data() {
            return {
            }
        },
        mounted: function () {
        },
        methods: {
        }
    }
</script>

<style>
    a {
        cursor: pointer;
    }

    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
</style>