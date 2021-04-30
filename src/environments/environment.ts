// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { domain, clientId, audience, awsLambdaUri } from '../../auth0-config.json';

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
    scope: 'read:current_user',
    httpInterceptor: {
      allowedList: [
        {
          uri: awsLambdaUri,
          tokenOptions: {
            audience,
            scope: 'read:current_user'
          },
        },
      ],
    },
  },
  aws: {
    authTokenLambdaUrl: awsLambdaUri,
    testAuthTokenUrl: 'http://localhost:3000/token'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyCQqmxrYDaRZnjk7e0d_aSaDel5d0kOu1U',
    authDomain: 'meal-plan-kiss.firebaseapp.com',
    projectId: 'meal-plan-kiss',
    storageBucket: 'meal-plan-kiss.appspot.com',
    messagingSenderId: '569020774179',
    appId: '1:569020774179:web:027244eb017a8f96063e96',
    measurementId: 'G-2NN7613VQ5'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
