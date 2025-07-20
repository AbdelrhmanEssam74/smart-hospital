import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8000/api/review-rating';

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Method to send a review
  sendReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, review, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // Method to get reviews for a specific doctor
  getDoctorReviews(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctorReviews/${doctorId}`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // Method to get reviews by ID, update a review, delete a review, and get patient reviews
  getReviewById(reviewId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/show/${reviewId}`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // Method to update a review
  updateReview(reviewId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${reviewId}`, updatedData, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // Method to delete a review
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${reviewId}`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // Method to get all patient reviews for the logged-in user
  getMyReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myReviews`, {
      headers: this.auth.getAuthHeaders()
    });
  }
  // get average rating for a doctor
  getAverageRating(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctorReviewsAverage/${doctorId}`, {
      headers: this.auth.getAuthHeaders()
    });
  }
}
