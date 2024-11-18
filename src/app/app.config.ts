import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthGuardService } from './service/authgurad/auth-guard.service';
import { JwtInterceptor } from './interceptor/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true}
  ]
};
