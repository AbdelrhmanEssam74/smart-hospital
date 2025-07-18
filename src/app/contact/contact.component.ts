import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '../services/notification.service'; // ✅
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactComponent implements OnInit {
  contactForm: any;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      phone: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        ...this.contactForm.value,
        phone: this.contactForm.value.phone?.toString() || null
      };

      this.contactService.sendMessage(formData).subscribe({
        next: (res) => {
          this.notificationService.success(res.message || 'Message sent!');
          this.contactForm.reset();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Failed to send message.');
          console.error('Error:', err);
        }
      });
    } else {
      this.notificationService.warning('Please fill in all required fields.');
    }
  }
}
