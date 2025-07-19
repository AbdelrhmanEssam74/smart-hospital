import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DoctorDetailsComponent} from './components/doctor-details/doctor-details.component';
import {ListDoctorComponent} from './components/list-doctor/list-doctor.component';
import {DoctorDashboardComponent} from './components/dashboards/doctor/doctor-dashboard/doctor-dashboard.component';
import {AppointmentsComponent} from './components/dashboards/doctor/appointments/appointments.component';
import {AddSlotComponent} from './components/dashboards/doctor/add-slot/add-slot.component';
import {ProfileEditComponent} from './components/dashboards/doctor/profile-edit/profile-edit.component';
import {PatientProfilesComponent} from './components/dashboards/doctor/patient-profiles/patient-profiles.component';
import {AuthGuard} from './guards/auth.guard';
import {PatientProfileComponent} from './components/dashboards/patient/patient-profile/patient-profile.component';
import {EditProfileComponent} from './components/dashboards/patient/edit-profile/edit-profile.component';
import {DoctorHomeComponent} from './components/dashboards/doctor/doctor-home/doctor-home.component';
import { GalleryComponent } from './components/home-components/gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AdminHomeComponent } from './components/dashboards/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/dashboards/admin/admin-dashboard/admin-dashboard.component';
import { AdminPatientsComponent } from './components/dashboards/admin/admin-patients/admin-patients.component';
import { AdminAppointmentsComponent } from './components/dashboards/admin/admin-appointments/admin-appointments.component';
import { AdminAddslotsComponent } from './components/dashboards/admin/admin-addslots/admin-addslots.component';
import { AdminAddUserComponent } from './components/dashboards/admin/admin-add-user/admin-add-user.component';
import { AdminDoctorsComponent } from './components/dashboards/admin/admin-doctors/admin-doctors.component';
import { AdminEditProfileComponent } from './components/dashboards/admin/admin-edit-profile/admin-edit-profile.component';
import { AdminContactsComponent } from './components/dashboards/admin/admin-contact/admin-contact.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'doctordetails/:id', component: DoctorDetailsComponent},
  {path: 'doctors', component: ListDoctorComponent},
  {
    path: 'doctor', component: DoctorHomeComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: DoctorDashboardComponent},
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'add-slot', component: AddSlotComponent},
      {path: 'edit-profile', component: ProfileEditComponent},
      {path: 'patients', component: PatientProfilesComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
    {
    path: 'admin', component: AdminHomeComponent, children: [
      {path: 'admin-home', component: AdminDashboardComponent},
      {path: 'admin-appointments', component: AdminAppointmentsComponent},
      {path: 'admin-add-slot', component: AdminAddslotsComponent},
      {path: 'admin-patients', component: AdminPatientsComponent},
      {path: 'admin-doctors', component: AdminDoctorsComponent},
      {path: 'admin-adduser',component:AdminAddUserComponent},
        {path: 'massagecontact',component: AdminContactsComponent},

      {path: 'admin-edit-profile', component: AdminEditProfileComponent},
    ]
  },
  {path: "patient_profile", component: PatientProfileComponent},
  { path: 'profile_edit', component: EditProfileComponent},
  {path:'gallery',component: GalleryComponent},
  {path:'contact', component: ContactComponent},
  {path: "**", redirectTo: "404", pathMatch: "full"}
]
