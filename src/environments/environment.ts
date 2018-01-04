// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBnZxHgxM3FpQxLxAfuAqjWJPa72f8Rbvw',
    authDomain: 'lightning-pod.firebaseapp.com',
    databaseURL: 'https://lightning-pod.firebaseio.com',
    projectId: 'lightning-pod',
    storageBucket: 'lightning-pod.appspot.com',
    messagingSenderId: '956260144377'
  }
};
