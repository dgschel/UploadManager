export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'e6be80b8-dca2-4ebf-bbbd-2b3aa3f224b1',
      authority:
        'https://uploadmanager.b2clogin.com/uploadmanager.onmicrosoft.com/B2C_1_signupsignin1',
      redirectUrl:
        'https://stuploadmanagement001.z1.web.core.windows.net/auth-response',
    },
  },
  endpoints: {
    fileUpload:
      'https://func-uploadmanager-prod-001.azurewebsites.net/api/upload-files?code=CvKS_UXUwx_StdjM-Sm7fwtEg5_635UATnV1sGSTbdWoAzFu9nX35g==',
  },
};
