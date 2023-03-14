import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobComponent } from './components/add-job/add-job.component';
import { DetailJobComponent } from './components/detail-job/detail-job.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:'signup', component: SignupComponent},
  {path: 'postjob', component: AddJobComponent, canActivate: [AuthGuard]},
  {path: 'getjob', component: ViewJobsComponent, canActivate: [AuthGuard]},
  {path: 'viewJob/:id', component: DetailJobComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
