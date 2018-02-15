import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  // { path: 'welcome', redirectTo: '', pathMatch: 'full' },
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
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
