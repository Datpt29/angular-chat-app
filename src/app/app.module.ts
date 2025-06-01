import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./features/auth/auth.module"
import { UserModule } from "./features/user/user.module";
import { HomeComponent } from './features/home/home.component';
import { PartnerComponent } from './features/partner/partner.component';
import { LayoutModule } from "./shared/layout/layout.module";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
