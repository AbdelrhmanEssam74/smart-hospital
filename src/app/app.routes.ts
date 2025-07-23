import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { DoctorDashboardComponent } from './components/dashboards/doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './components/dashboards/doctor/appointments/appointments.component';
import { AddSlotComponent } from './components/dashboards/doctor/add-slot/add-slot.component';
import { ProfileEditComponent } from './components/dashboards/doctor/profile-edit/profile-edit.component';
import { PatientProfilesComponent } from './components/dashboards/doctor/patient-profiles/patient-profiles.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientProfileComponent } from './components/dashboards/patient/patient-profile/patient-profile.component';
import { EditProfileComponent } from './components/dashboards/patient/edit-profile/edit-profile.component';
import { DoctorHomeComponent } from './components/dashboards/doctor/doctor-home/doctor-home.component';
import { GalleryComponent } from './components/home-components/gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AdminHomeComponent } from './components/dashboards/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/dashboards/admin/admin-dashboard/admin-dashboard.component';
import { AdminPatientsComponent } from './components/dashboards/admin/admin-patients/admin-patients.component';
import { AdminAppointmentsComponent } from './components/dashboards/admin/admin-appointments/admin-appointments.component';
import { AdminAddslotsComponent } from './components/dashboards/admin/admin-addslots/admin-addslots.component';
import { AdminAddUserComponent } from './components/dashboards/admin/admin-add-user/admin-add-user.component';
import { AdminDoctorsComponent } from './components/dashboards/admin/admin-doctors/admin-doctors.component';
import { AdminContactsComponent } from './components/dashboards/admin/admin-contact/admin-contact.component';
import { AdminEditUserComponent } from './components/dashboards/admin/admin-edit-user/admin-edit-user.component';
import { AdminEditProfileComponent } from './components/dashboards/admin/admin-edit-profile/admin-edit-profile.component';
import { AdminMangeDoctorComponent } from './components/dashboards/admin/admin-mange-doctor/admin-mange-doctor.component';
import { InactiveDoctorMessageComponent } from './components/inactive-doctor-message/inactive-doctor-message.component';
import { LoginRegisterGuard } from './guards/login-register.guard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard] },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'doctordetails/:id',
    component: DoctorDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'doctors', component: ListDoctorComponent },
  {
    path: 'doctor',
    component: DoctorHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DoctorDashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'add-slot', component: AddSlotComponent },
      { path: 'edit-profile', component: ProfileEditComponent },
      { path: 'patients', component: PatientProfilesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'admin-home', component: AdminDashboardComponent },
      { path: 'admin-appointments', component: AdminAppointmentsComponent },
      { path: 'admin-add-slot', component: AdminAddslotsComponent },
      { path: 'admin-patients', component: AdminPatientsComponent },
      { path: 'admin-doctors', component: AdminDoctorsComponent },
      { path: 'admin-adduser', component: AdminAddUserComponent },
      { path: 'admin-edituser/:id', component: AdminEditUserComponent },
      { path: 'admin-edit-profile', component: AdminEditProfileComponent },
      { path: '', redirectTo: 'admin-home', pathMatch: 'full' },
      { path: 'admin-edituser', component: AdminAddUserComponent },
      // pending
      { path: 'manage-pending', component: AdminMangeDoctorComponent },
      { path: 'massagecontact', component: AdminContactsComponent },
    ],
  },
  { path: 'patient_profile', component: PatientProfileComponent },
  { path: 'profile_edit', component: EditProfileComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'doctor-status', component: InactiveDoctorMessageComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
