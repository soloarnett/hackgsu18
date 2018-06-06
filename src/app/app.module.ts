import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MentorsComponent } from './mentors/mentors.component';
import { MentorsNewComponent } from './mentors-new/mentors-new.component';
import { MentorsStatusComponent } from './mentors-status/mentors-status.component';
import { MentorsLoginComponent } from './mentors-login/mentors-login.component';
import { MentorsVerifyStatusComponent } from './mentors-verify-status/mentors-verify-status.component';
import { AlertWindowComponent } from './alert-window/alert-window.component';
import { AboutComponent } from './about/about.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { GetTheAppComponent } from './get-the-app/get-the-app.component';




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
    MentorsComponent,
    MentorsNewComponent,
    MentorsStatusComponent,
    MentorsLoginComponent,
    MentorsVerifyStatusComponent,
    AlertWindowComponent,
    AboutComponent,
    SponsorsComponent,
    GetTheAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
