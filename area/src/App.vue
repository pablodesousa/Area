<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="secondary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Area</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <h2 v-if="dataObject !== undefined && authenticated" style="margin-top: 2%">welcome {{ this.dataObject.idTokenPayload.nickname }}</h2>
          &ensp;
          <div v-if="dataObject !== undefined && authenticated">
            <img :src="this.dataObject.idTokenPayload.picture" width="50%"></img>
          </div>
          <b-nav-item right>
            <button
                    id="qsLoginBtn"
                    class="btn btn-danger btn-margin"
                    v-if="!authenticated"
                    @click="login()">
              Log In
            </button>
              <button
                      id="qsLogoutBtn"
                      class="btn btn-danger btn-margin"
                      v-if="authenticated"
                      @click="logout()">
                Log Out
              </button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container">
      <router-view
              :auth="auth"
              :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
  import AuthService from './auth/AuthServices'

  const auth = new AuthService();
  export default {
    name: 'app',
    data () {
      return {
        auth,
        authenticated: auth.authenticated,
        dataObject: this.getData(),
      }
    },
    created () {
      auth.authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
      });
      if (auth.getAuthenticatedFlag() === 'true') {
        auth.renewSession()
      }
    },
    mounted: function () {
      this.getData()
    },
    methods: {
      login() {
        auth.login()
      },
      logout() {
        auth.logout()
      },
      getData() {
        this.dataObject = JSON.parse(localStorage.getItem('object'));
        console.log(this.dataObject);
      }
    },
  }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  .btn-margin {
    margin-top: 7px
  }

</style>

