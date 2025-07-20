import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReviewsService} from '../../services/reviews.service';
import {NotificationService} from '../../services/notification.service';
import {Reviews} from '../../interfaces/reviews';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-doctor-reviews',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NgForOf,
    FormsModule
  ],
  templateUrl: './doctor-reviews.component.html',
  styleUrl: './doctor-reviews.component.css'
})
export class DoctorReviewsComponent implements OnInit {
  @Input({transform: numberAttribute}) doctorId!: number;
  feedbackForm!: FormGroup;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  isSubmitting = false;
  submitSuccess = false;
  reviews: Reviews[] = [];
  userId: number = 0;
  isOwner: boolean = false;
  showPopup = false;
  showDeleteModal: boolean = false;
  editMode = false;
  selectedReviewId: number | null = null;
  selectedReview: Reviews | null = null;

  constructor(private fb: FormBuilder, private review: ReviewsService, private auth: AuthService, private notify: NotificationService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getDoctorReviews();
    this.userId = this.auth.getUser().data.id
  }

  initializeForm(): void {
    this.feedbackForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  rate(star: number): void {
    this.rating = star;
    this.feedbackForm.patchValue({rating: star});
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.isSubmitting = true;
      const data = {
        doctor_id: this.doctorId,
        rating: this.feedbackForm.value.rating,
        comment: this.feedbackForm.value.comment
      };

      this.review.sendReview(data).subscribe(res => {
        this.afterSubmit(res.message || 'Review sent successfully!');
      }, error => {
        this.handleError(error);
      });
    }
  }
  onUpdate(): void {
    if (this.feedbackForm.valid && this.selectedReview) {
      this.isSubmitting = true;
      this.closePopup()
      const data = {
        doctor_id: this.doctorId,
        rating: this.feedbackForm.value.rating,
        comment: this.feedbackForm.value.comment
      };

      this.review.updateReview(this.selectedReview.id, data).subscribe(res => {
        this.afterSubmit(res.message || 'Review updated successfully!');
      }, error => {
        this.handleError(error);
      });
    }
  }

  afterSubmit(message: string): void {
    this.getDoctorReviews();
    this.isSubmitting = false;
    this.submitSuccess = true;
    this.feedbackForm.reset();
    this.rating = 0;
    this.editMode = false;
    this.selectedReviewId = null;
    this.showPopup = false;
    this.notify.success(message);
  }
  handleError(error: any): void {
    this.isSubmitting = false;
    this.notify.error(error.error?.message || 'Failed to process review.');
  }
  // get reviews of a specific doctor
  getDoctorReviews(): void {
    if (this.doctorId) {
      this.review.getDoctorReviews(this.doctorId).subscribe((res) => {
        this.reviews = res.reviews;
        console.log(this.reviews);
      }, error => {
        this.notify.error(error.error?.message || 'Failed to fetch reviews.');
      });
    }
  }

  // format the date
  dateFormat(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }
  ifOwner(review: Reviews): boolean {
    this.isOwner = review.user.id === this.userId;
    return this.isOwner;
  }
  // show specific review in a popup
  viewReview(reviewId: number): void {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      this.selectedReview = review;
      this.feedbackForm.patchValue({
        rating: review.rating,
        comment: review.comment
      });
      this.rating = review.rating;
      this.showPopup = true;
    }
  }



  closePopup(): void {
    this.showPopup = false;
  }

  openDeleteModal(reviewId: number): void {
    this.selectedReviewId = reviewId;
    this.showDeleteModal = true;
  }
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedReviewId = null;
  }
  confirmDelete(): void {
    if (this.selectedReviewId) {
      this.review.deleteReview(this.selectedReviewId).subscribe(res => {
        this.getDoctorReviews();
        this.notify.success(res.message || 'Review deleted successfully!');
      }, error => {
        this.notify.error(error.error?.message || 'Failed to delete review.');
      });
      this.showDeleteModal = false;
      this.selectedReviewId = null;
    }
  }
}
