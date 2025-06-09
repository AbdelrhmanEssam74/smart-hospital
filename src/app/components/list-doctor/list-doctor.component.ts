import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DoctorComponent } from '../doctor/doctor.component';

@Component({
  selector: 'app-list-doctor',
  imports: [CommonModule,FormsModule,DoctorComponent],
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.css'
})
export class ListDoctorComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchTerm: string = '';
  searchForm: FormGroup;

  constructor(private doctorService: DoctorService, 
    private fb: FormBuilder
  ) {
     this.searchForm = this.fb.group({
      name: [''],
      specialty: ['']
    });
  }

 ngOnInit(): void {
    this.doctors = this.doctorService.getDoctors();
    this.filteredDoctors = [...this.doctors]; 
  }
filterDoctors() {
  const term = this.searchTerm.toLowerCase();
  this.filteredDoctors = this.doctors.filter(doctor => {
    const name = doctor.name?.toLowerCase() || '';
    const specialization = doctor.specialty?.toLowerCase() || '';
    return name.includes(term) || specialization.includes(term);

  });
}
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDoctors = [...this.doctors];
  }

}
