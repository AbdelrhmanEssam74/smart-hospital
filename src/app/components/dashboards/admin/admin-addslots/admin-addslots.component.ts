import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlotService } from '../../../../services/admin/slot.service';
import { NotificationService } from '../../../../services/notification.service';

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

  constructor(
    private http: HttpClient,
    private slotService: SlotService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.http.get('http://localhost:8000/api/admin/doctors/dropdown').subscribe({
      next: (res: any) => {
        this.doctors = res;
        this.loadSlots();
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
        this.notificationService.error('Failed to load doctors');
      }
    });
  }

  loadSlots() {
    this.slotService.getAllSlots().subscribe({
      next: (data: any[]) => {
        this.slots = data.map(slot => {
          const doctor = this.doctors.find(d => d.id == slot.doctor_id);
          return {
            ...slot,
            doctor_name: doctor ? doctor.name : 'Unknown'
          };
        });
        this.notificationService.success('Slots loaded successfully');
      },
      error: (err) => {
        console.error('Error loading slots:', err);
        this.notificationService.error('Failed to load slots');
      }
    });
  }

  addSlot() {
    this.slotService.addSlot(this.newSlot).subscribe({
      next: (res) => {
        this.notificationService.success('Slot added successfully');
        this.newSlot = {
          doctor_id: '',
          date: '',
          start_time: '',
          end_time: '',
          status: 'available'
        };
        this.loadSlots();
      },
      error: (err) => {
        console.error('Error adding slot:', err);
        this.notificationService.error('Failed to add slot');
      }
    });
  }

  deleteSlot(id: number) {
    if (confirm('Are you sure you want to delete this slot?')) {
      this.slotService.deleteSlot(id).subscribe({
        next: () => {
          this.notificationService.success('Slot deleted successfully');
          this.loadSlots();
        },
        error: (err) => {
          console.error('Error deleting slot:', err);
          this.notificationService.error('Failed to delete slot');
        }
      });
    }
  }
}
