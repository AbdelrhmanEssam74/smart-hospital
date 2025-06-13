import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  imports: [],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent {
  doctorId: number | null = null;
  doctor: any;

    constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

    ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.doctorId = idParam ? +idParam : null;

      if (this.doctorId !== null) {
        const allDoctors = this.doctorService.getDoctorDisplayList();
        this.doctor = allDoctors.find(d => d.id === this.doctorId);
      }
    });
  }
}
