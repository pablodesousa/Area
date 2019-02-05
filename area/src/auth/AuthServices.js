import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {
    accessToken
    idToken
    expiresAt
    authenticated = this.isAuthenticated();
    authNotifier = new EventEmitter();

    auth0 = new auth0.WebAuth({
        domain: 'epitech-dashboard.eu.auth0.com',
        clientID: 'GPGYTY6SQbHAVwzyaLNJxgy0iSdB4cJ3',
        redirectUri: 'http://localhost:8080/callback',
        responseType: 'token id_token',
        scope: 'openid email profile'
    });

    login () {
        this.auth0.authorize()
    }

    handleAuthentication () {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                router.replace('home');
            } else if (err) {
                router.replace('home');
                console.log(err)
            }
        })
    }

    setSession (authResult) {
        this.accessToken = authResult.accessToken
        this.idToken = authResult.idToken
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

        //send to API
        localStorage.setItem('object', JSON.stringify(authResult));
        //Fin du call API
        this.authNotifier.emit('authChange', { authenticated: true });


        localStorage.setItem('loggedIn', true)
    }

    renewSession () {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
            } else if (err) {
                this.logout()
                console.log(err)
            }
        })
    }

    logout () {
        // Clear access token and ID token from local storage
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = null;

        this.userProfile = null;
        this.authNotifier.emit('authChange', false);

        localStorage.removeItem('loggedIn');

        // navigate to the home route
        router.replace('home')
    }

    getAuthenticatedFlag () {
        return localStorage.getItem('loggedIn')
    }

    isAuthenticated () {
        return new Date().getTime() < this.expiresAt && this.getAuthenticatedFlag() === 'true'
    }
}