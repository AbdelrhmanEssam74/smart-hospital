// src/app/services/slot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private baseUrl = 'http://localhost:8000/api/admin/slots';

  constructor(private http: HttpClient) {}

  getAllSlots() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addSlot(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteSlot(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
