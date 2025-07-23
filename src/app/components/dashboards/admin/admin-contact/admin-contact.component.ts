import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/admin/contact.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
})
export class AdminContactsComponent implements OnInit {
  contacts: any[] = [];

  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (res) => {
        this.contacts = res;
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
      },
    });
  }

  deleteMessage(id: number): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter((contact) => contact.id !== id);
          this.notificationService.success('Message deleted successfully ');
        },
        error: (err: any) => {
          console.error('Error deleting message:', err);
          this.notificationService.error('Failed to delete message ');
        },
      });
    }
  }
}
