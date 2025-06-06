import { Component } from '@angular/core';
import {HeroComponent} from '../home-components/hero/hero.component';
import {AppointmentFormComponent} from '../home-components/appointment-form/appointment-form.component';
import {OurAvailableServicesComponent} from '../home-components/our-available-services/our-available-services.component';
import {ChooseUsComponent} from '../home-components/choose-us/choose-us.component';
import {OurScheduleComponent} from '../home-components/our-schedule/our-schedule.component';
import {GalleryComponent} from '../home-components/gallery/gallery.component';
import {OurDepartmentsComponent} from '../home-components/our-departments/our-departments.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AppointmentFormComponent,
    OurAvailableServicesComponent,
    ChooseUsComponent,
    OurScheduleComponent,
    GalleryComponent,
    OurDepartmentsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
