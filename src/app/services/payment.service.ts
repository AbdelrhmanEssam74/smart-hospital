// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/paypal/create'; 

  constructor(private http: HttpClient) {}

  payWithPayPal(appointmentId: number) {
    return this.http.post<any>(this.apiUrl, {
      appointment_id: appointmentId,
    });
  }
}
