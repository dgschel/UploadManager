import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

// This is the callback function that will be called by the MSAL logger
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId, // This is your client ID from the registered application in Azure AD B2C
      authority: environment.msalConfig.auth.authority, // This is the authority URL that you specified in the registered application in Azure AD B2C
      redirectUri: environment.msalConfig.auth.redirectUrl, // This is the redirect URL that you specified in the registered application in Azure AD B2C. it needs to match with the configuration
      knownAuthorities: ['https://uploadmanager.b2clogin.com'], // This is the trusted URL that you specified in Azure AD B2C
      navigateToLoginRequestUrl: false, // This is a boolean that specifies whether the application should navigate to the origin URL after login. Set to false to redirect to the redirect URL
      postLogoutRedirectUri: '/logout', // This is the URL that the application will redirect to after logout
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback, // callback function for the MSAL logger
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid'], // This is the scope that the application will request from the user. It is defined in the registered application in Azure AD B2C under the API permissions
    },
    loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    {
      provide: MSAL_INSTANCE, // This is the token that the MSAL service will use to create the instance
      useFactory: MSALInstanceFactory, // This is the factory that will create the instance
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    MsalService, // This is the service that will be used to interact with the MSAL instance
    MsalBroadcastService, // This is the service that will be used to broadcast the MSAL events
    MsalGuard, // This is the guard that will be used to protect the routes
  ],
};
