import Service from '@ember/service';
import { computed } from '@ember/object';
import config from 'ember-auth0/config/environment';

export default class AuthService extends Service {
  auth0: computed(function () {
    return new auth0.WebAuth({
      domain: config.auth0.domain,
      clientID: config.auth0.clientId,
      redirectUri: config.auth0.callbackUri,
      audience: `https://${config.auth0.domain}/userinfo`,
      responceType: 'token',
      scope: 'openid profile'
    });
  }),

  login() {
    this.get('auth0').authorize();
  },

  handleAuthentication() {
    return new Promise((resolve) => {
      this.get('auth0').parseHash((err, authResult) => { 
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
        }
        
        return resolve();
      });
    });
  },
  
  isAuthenticated: computed(function() {
    return this.get('checkLogin');
  }),

  setUser(token) {
    this.get('auth0')
      .client
      .userInfo(token, (err, profile) => this.set('user', profile));
  },

  checkLogin() {
    this.get('auth0')
      .checkSession({}, (err, authResult) => {
        if (err) return err;
        this.setUser(authResult.accesstoken);
      });
  },

  logout() {
    this.get('auth0').logout({
      clientID: config.auth0.clientId,
      returnTo: 'http://localhost:42001
    });
  }
}
