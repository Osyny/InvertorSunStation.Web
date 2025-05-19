import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AnimateModule } from 'primeng/animate';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

//
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule } from '@angular/router';
import { LayoutStoreService } from './shared/layout/layout-store.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth/auth.interceptor';
import { HeaderUserComponent } from './layout/headers/header-user/header-user.component';
import { HeaderComponent } from './layout/headers/header/header.component';
import { HeaderBrandComponent } from './layout/headers/header-brand/header-brand.component';
import { UserAvatarComponent } from './layout/headers/user-avatar/user-avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderUserComponent,
    HeaderBrandComponent,
    UserAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PanelMenuModule,
    AnimateModule,
    FormsModule,

    BrowserAnimationsModule,
    // NgToastModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),

    RouterModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    LayoutStoreService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
