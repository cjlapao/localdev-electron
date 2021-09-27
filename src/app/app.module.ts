import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { TestingComponent } from './components/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    StatusBarComponent,
    HomeComponent,
    TestingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
