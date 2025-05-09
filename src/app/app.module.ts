import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [AppComponent],
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

  bootstrap: [AppComponent],
})
export class AppModule {}
