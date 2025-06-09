import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'doctordetails/:id', component: DoctorDetailsComponent },
  { path: 'doctors', component: ListDoctorComponent },
  {path: "**", redirectTo: "404", pathMatch: "full"}
]
