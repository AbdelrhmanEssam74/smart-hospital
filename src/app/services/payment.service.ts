// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/paypal/create';

  constructor(private http: HttpClient , private auth: AuthService) {}

  payWithPayPal(appointmentId: number) {
    return this.http.post<any>(this.apiUrl, {
      headers: this.auth.getAuthHeaders(),
      appointment_id: appointmentId,
    });
  }
}
