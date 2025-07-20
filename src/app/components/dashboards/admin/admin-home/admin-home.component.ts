import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../../../services/admin/dashboard.service';

@Component({
  selector: 'app-admin-home',
  imports: [    RouterLink,
    RouterLinkActive,
    RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
user: any = null;
stats: any = null;
admin: any = null;
errorMessage= false;
isLoading= false;

constructor(private adminService: DashboardService) {}
ngOnInit() {
 this.loadDashboard();
  }
loadDashboard(): void {

  this.adminService.getDashboardData().subscribe({
    next: (data) => {
      console.log(data);
      this.stats = data.stats;
      this.admin = data.admin;
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Failed to load dashboard';
    },
    complete: () => this.isLoading = false
  });
}
}