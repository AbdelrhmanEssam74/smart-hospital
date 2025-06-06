import { Component } from '@angular/core';
import {HeroComponent} from '../hero/hero.component';
import {AppointmentFormComponent} from '../appointment-form/appointment-form.component';
import {OurAvailableServicesComponent} from '../our-available-services/our-available-services.component';
import {ChooseUsComponent} from '../home-components/choose-us/choose-us.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AppointmentFormComponent,
    OurAvailableServicesComponent,
    ChooseUsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
