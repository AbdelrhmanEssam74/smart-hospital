import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { DoctorDashboardComponent } from './components/dashboards/doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './components/dashboards/doctor/appointments/appointments.component';
import { AddSlotComponent } from './components/dashboards/doctor/add-slot/add-slot.component';
import { ProfileEditComponent } from './components/dashboards/doctor/profile-edit/profile-edit.component';
import { PatientProfilesComponent } from './components/dashboards/doctor/patient-profiles/patient-profiles.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'doctordetails/:id', component: DoctorDetailsComponent },
  { path: 'doctors', component: ListDoctorComponent },
  { path: 'doctor', component: DoctorDashboardComponent, children: [
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'add-slot', component: AddSlotComponent },
  { path: 'edit-profile', component: ProfileEditComponent },
  { path: 'patients', component: PatientProfilesComponent },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' }
]},
  {path: "**", redirectTo: "404", pathMatch: "full"}
]
