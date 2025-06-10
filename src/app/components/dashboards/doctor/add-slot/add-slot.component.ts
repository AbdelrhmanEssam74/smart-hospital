import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../../services/appointments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-slot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  slot = {
    doctor_id: '',
    slot_date: '',
    start_time: '',
    end_time: ''
  };

  constructor(private service: AppointmentsService) {}

  ngOnInit() {
    const storedDoctorId = localStorage.getItem('doctor_id');
    if (storedDoctorId) {
      this.slot.doctor_id = storedDoctorId;
    } else {
      alert('Doctor ID not found in localStorage.');
    }
  }

  addSlot() {
    if (!this.slot.doctor_id) {
      alert('Doctor ID is missing!');
      return;
    }

    this.service.addSlot(this.slot);
    alert('Time slot added successfully!');
    this.slot = {
      doctor_id: this.slot.doctor_id, 
      slot_date: '',
      start_time: '',
      end_time: ''
    };
  }
}
