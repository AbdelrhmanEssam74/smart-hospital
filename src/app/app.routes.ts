import { Routes } from '@angular/router';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';

export const routes: Routes = [
      { path: '', component: ListDoctorComponent },
    { path: 'doctordetails/:id', component: DoctorDetailsComponent },
    { path: 'listdoctor', component: ListDoctorComponent },

];
