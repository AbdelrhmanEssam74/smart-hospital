import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlotService } from '../../../../services/admin/slot.service';

@Component({
  selector: 'app-admin-addslots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-addslots.component.html',
  styleUrls: ['./admin-addslots.component.css']
})
export class AdminAddslotsComponent implements OnInit {
  doctors: any[] = [];
  slots: any[] = [];

  newSlot = {
    doctor_id: '',
    date: '',
    start_time: '',
    end_time: '',
    status: 'available'
  };

  constructor(private http: HttpClient, private slotService: SlotService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.http.get('http://localhost:8000/api/admin/doctors/dropdown')
      .subscribe((res: any) => {
        this.doctors = res;
        this.loadSlots(); // مهم: نستنى لما الدكاترة تتجاب، بعدين نجيب الـ slots ونربطهم
      });
  }

  loadSlots() {
    this.slotService.getAllSlots().subscribe(
      (data: any[]) => {
        // نربط كل slot باسم الدكتور
        this.slots = data.map(slot => {
          const doctor = this.doctors.find(d => d.id == slot.doctor_id);
          return {
            ...slot,
            doctor_name: doctor ? doctor.name : 'Unknown'
          };
        });
      },
      (err) => console.error('Error loading slots', err)
    );
  }

  addSlot() {
    this.slotService.addSlot(this.newSlot).subscribe(
      (res) => {
        console.log('Slot added successfully', res);
        this.newSlot = {
          doctor_id: '',
          date: '',
          start_time: '',
          end_time: '',
          status: 'available'
        };
        this.loadSlots();
      },
      (err) => {
        console.error('Error adding slot', err);
      }
    );
  }

  deleteSlot(id: number) {
    if (confirm('Are you sure you want to delete this slot?')) {
      this.slotService.deleteSlot(id).subscribe(
        () => {
          console.log('Slot deleted');
          this.loadSlots();
        },
        (err) => {
          console.error('Error deleting slot', err);
        }
      );
    }
  }
}
