import { Component } from '@angular/core';
import { Patient } from '../../../../interfaces/patient';
import { PatientService } from '../../../../services/patient.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-patient-profiles',
  standalone:true,
  imports: [],
  templateUrl: './patient-profiles.component.html',
  styleUrl: './patient-profiles.component.css'
})
export class PatientProfilesComponent {
 patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
  }
}
