// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/api',
  paypal: {
    clientId: 'AWea26ZkbBJLSIreoX7Yxo6TRlaSd73pBiqtrUcAjFV43lS_ZzXIProyx4jCnN88WpoKfx88IrWvO2WU',
    secret: 'EJw4VZOrkSzrdD-iNYEphDHsGyk9Ax5FpFTcT72XZBObSV2n-WlUKkVTCHDvAIrAfQaBE7KZ9nXeIV_K',
    productId: 'PROD-18C20064H2774745A'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
