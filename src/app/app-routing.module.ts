import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { FaqComponent } from './faq/faq.component';
import { TestComponent } from './test/test.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorsNewComponent } from './mentors-new/mentors-new.component';
import { MentorsStatusComponent } from './mentors-status/mentors-status.component';
import { MentorsLoginComponent } from './mentors-login/mentors-login.component';
import { MentorsVerifyStatusComponent } from './mentors-verify-status/mentors-verify-status.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { QrtestComponent } from './qrtest/qrtest.component';

const routes: Routes = [
  // { path: 'welcome', redirectTo: '', pathMatch: 'full' },
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'faq', component: FaqComponent },
  { path: 'qr', component: QrtestComponent },

  /** Temporarily Disabled
  { path: 'schedule', component: ScheduleComponent },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'support', component: MentorsComponent },
  { path: 'support/new', component: MentorsNewComponent },
  { path: 'support/status', component: MentorsStatusComponent },
  { path: 'support/status/:id', component: MentorsStatusComponent },
  { path: 'support/verify/:verification', component: MentorsVerifyStatusComponent },
  { path: 'support/verify/:id/:verification', component: MentorsVerifyStatusComponent },
  { path: 'mentors', component: MentorsLoginComponent },
   */
  // { path: 'test', component: TestComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    // {enableTracing: true} // <- debugging only. comment out after
    { 
      // useHash: true,
      // enableTracing: true 
    }
  ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
