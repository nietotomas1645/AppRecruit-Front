import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobComponent } from './components/add-job/add-job.component';
import { DetailJobComponent } from './components/detail-job/detail-job.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent },
  {path:'signup', component: SignupComponent},
  {path: 'postjob', component: AddJobComponent},
  {path: 'getjob', component: ViewJobsComponent},
  {path: 'viewJob/:id', component: DetailJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
