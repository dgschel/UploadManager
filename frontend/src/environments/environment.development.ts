export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'e6be80b8-dca2-4ebf-bbbd-2b3aa3f224b1',
      authority:
        'https://uploadmanager.b2clogin.com/uploadmanager.onmicrosoft.com/B2C_1_signupsignin1',
      redirectUrl: 'http://localhost:4200/auth-response',
    },
  },
  endpoints: {
    fileUpload: 'http://localhost:7071/api/upload-files',
  },
};
