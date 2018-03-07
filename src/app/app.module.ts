import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './faq/faq.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SafePipe } from './safe.pipe';
import { TestComponent } from './test/test.component';
import { ScheduleComponent } from './schedule/schedule.component';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    FaqComponent,
    NavbarComponent,
    SafePipe,
    TestComponent,
    ScheduleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
