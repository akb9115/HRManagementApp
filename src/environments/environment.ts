// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  postDataUrl:"http://cicd.intelegencia.com:3000/api/users/register",
  fetchDataUrl:"http://cicd.intelegencia.com:3000/api/users/",
  putDataurl:"http://cicd.intelegencia.com:3000/api/users/",
  apiUrl: 'http://localhost:4000',
  employeeUrl: 'http://localhost:3000/userInfo',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
