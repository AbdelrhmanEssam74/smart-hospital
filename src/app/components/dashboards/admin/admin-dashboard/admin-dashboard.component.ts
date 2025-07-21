import { Component } from '@angular/core';
import { DashboardService } from '../../../../services/admin/dashboard.service';
import { UserControlService } from '../../../../services/admin/user-control.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

interface DashboardData {
  patients_count: number;
  doctors_count: number;
  appointments_today: number;
  available_slots: number;
  users_count: number;
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  dashboardData: any = {
    patients_count: 0,
    doctors_count: 0,
    appointments_today: 0,
    available_slots: 0,
    users_count: 0,
  };

  users: User[] = [];
  isLoading = false;
  editUserForm!: FormGroup;

  isEditing = false;
  currentUserId: number | null = null;

  // pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalUsers: number = 0;
  paginatedUsers: User[] = [];
  stats: any = null;


  constructor(
    private adminApi: DashboardService,
    private userService: UserControlService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadDashboardData();
    this.loadUsers();
    this.updatePaginatedUsers();
  }
  loadDashboardData(): void {
    this.isLoading = true;
    this.adminApi.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = {
          patients_count: data.stats.patients_count,
          doctors_count: data.stats.doctors_count,
          appointments_today: data.stats.appointments_today,
          available_slots: data.stats.available_slots,
          users_count: data.stats.users_count,
        };


      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  formatNumber(value: any): string {
    const num = Number(value);
    return isNaN(num) ? '0' : num.toLocaleString();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.dashboardData.users_count = this.users.length;
        this.totalUsers = this.users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.pageSize);
        this.updatePaginatedUsers();
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
          this.updatePaginatedUsers();

        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  // pagination

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalUsers);
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  editUser(id: number): void {
  this.router.navigate(['/admin/admin-edituser/', id]);

}


}
