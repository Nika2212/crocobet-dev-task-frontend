import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { AccessTokenService } from './core/services/access-token.service';
import { GrowlModule } from './shared/components/growl/growl.module';
import { GrowlService } from './core/services/growl.service';
import { LoaderModule } from './shared/components/loader/loader.module';
import { LoaderService } from './core/services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GrowlModule,
    LoaderModule
  ],
  providers: [
    AuthService,
    AccessTokenService,
    GrowlService,
    LoaderService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
