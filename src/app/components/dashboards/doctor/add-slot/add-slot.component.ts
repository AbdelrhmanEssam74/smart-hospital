import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {AuthService} from '../../../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-add-slot',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, NgClass],
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  slot = {
    slot_date: '',
    start_time: '',
    end_time: ''
  };
constructor(private http: HttpClient, private auth: AuthService , private notify:NotificationService) {
}
  doctorSlots: Array<any> = [];
  showPopup = false;
  selectedSlot: any = null;
  loading: boolean = true;
  slotLoading = false;
  selectedSlotToDelete: number | null = null;
  showDeleteModal: boolean = false;
  ngOnInit() {
    this.getDoctorSlots();
  }

  getDoctorSlots() {
    this.loading = true;
    this.http.get<any>('http://127.0.0.1:8000/api/doctor/time-slots', {
      headers: this.auth.getAuthHeaders()
    }).subscribe(data => {
      this.doctorSlots = data.slots;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  addSlot() {
    const requestData = {
      date: this.slot.slot_date,
      start_time: this.slot.start_time + ':00',
      end_time: this.slot.end_time + ':00',
    };
    this.http.post('http://127.0.0.1:8000/api/doctor/time-slots/store', requestData, {
      headers: this.auth.getAuthHeaders()
    }).subscribe(() => {
      this.getDoctorSlots();
      this.slot = { slot_date: '', start_time: '', end_time: '' };
      this.notify.success("Slot Added Successfully");
    }, error => {
      this.notify.error("Failed to add slot. Please check your input.");
      console.error(error);
    });
  }


  deleteSlot(id: number) {
    this.http.delete(`http://127.0.0.1:8000/apidoctor/time-slots/delete/${id}`, {
      headers: this.auth.getAuthHeaders()
    }).subscribe(() => this.getDoctorSlots());
  }


  viewSlot(slotId: number): void {
    this.showPopup = true;
    this.slotLoading = true;
    this.selectedSlot = null;
    this.http.get<any>(`http://127.0.0.1:8000/api/doctor/time-slots/show/${slotId}`, {
      headers: this.auth.getAuthHeaders()
    }).subscribe(response => {
      this.selectedSlot = response.data;
      this.slotLoading = false;
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedSlot = null;
    this.slotLoading = false;
  }
  updateSlot(): void {
    const formattedSlot = {
      date: this.selectedSlot.date,
      start_time: this.addSeconds(this.selectedSlot.start_time),
      end_time: this.addSeconds(this.selectedSlot.end_time),
      status: this.selectedSlot.status || 'available'
    };

    this.http.put(
      `http://127.0.0.1:8000/api/doctor/time-slots/update/${this.selectedSlot.id}`,
      formattedSlot,
      { headers: this.auth.getAuthHeaders() }
    ).subscribe({
      next: () => {
        this.notify.success("Slot updated successfully");
        this.closePopup();
        this.getDoctorSlots();
      },
      error: (err) => {
        this.notify.error("Failed to update slot");
        console.error(err);
      }
    });
  }


  addSeconds(time: string): string {
    return time.length === 5 ? `${time}:00` : time;
  }

  openDeleteModal(slotId: number): void {
    this.selectedSlotToDelete = slotId;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedSlotToDelete = null;
  }

  confirmDelete(): void {
    if (this.selectedSlotToDelete !== null) {
      this.http.delete(`http://127.0.0.1:8000/api/doctor/time-slots/delete/${this.selectedSlotToDelete}`, {
        headers: this.auth.getAuthHeaders()
      }).subscribe({
        next: () => {
          this.notify.success("Slot deleted successfully");
          this.getDoctorSlots(); // refresh
          this.cancelDelete();
        },
        error: () => {
          this.notify.error("Failed to delete slot");
          this.cancelDelete();
        }
      });
    }
  }

}
