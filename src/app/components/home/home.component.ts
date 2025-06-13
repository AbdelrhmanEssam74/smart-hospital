import { Component } from '@angular/core';
import {HeroComponent} from '../home-components/hero/hero.component';
import {OurAvailableServicesComponent} from '../home-components/our-available-services/our-available-services.component';
import {ChooseUsComponent} from '../home-components/choose-us/choose-us.component';
import {OurScheduleComponent} from '../home-components/our-schedule/our-schedule.component';
import {GalleryComponent} from '../home-components/gallery/gallery.component';
import {OurDepartmentsComponent} from '../home-components/our-departments/our-departments.component';
import {CounterSectionComponent} from '../home-components/counter-section/counter-section.component';
import {QualifiedDoctorComponent} from '../home-components/qualified-doctor/qualified-doctor.component';
import {LatestNewsComponent} from '../home-components/latest-news/latest-news.component';
import {ContactSectionComponent} from '../home-components/contact-section/contact-section.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    OurAvailableServicesComponent,
    ChooseUsComponent,
    OurScheduleComponent,
    GalleryComponent,
    OurDepartmentsComponent,
    CounterSectionComponent,
    QualifiedDoctorComponent,
    LatestNewsComponent,
    ContactSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
