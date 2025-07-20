import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserControlService } from '../../../../services/admin/user-control.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.css'
})
export class AdminEditUserComponent {
  editUserForm: FormGroup;
  userId: any;
  isLoading = false;
  errorMessage = '';
  constructor(private fb:FormBuilder,
    private userService:UserControlService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]{10,15}$/)],
      role_id: ['', Validators.required],
      address: [''],
      gender: [''],
      date_of_birth: [''],
      profile_description: ['']
    });
  }
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }
  loadUserData(): void {
    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.editUserForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role_id: user.role_id,
          address: user.address,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
          profile_description: user.profile_description
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load user data';
        this.isLoading = false;
        console.error('Error loading user:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      this.isLoading = true;
      this.userService.updateUser(this.userId, this.editUserForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/admin-home']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update user';
          this.isLoading = false;
          console.error('Error updating user:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/admin-home']);
  }
calculateAge(dob: string): number {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', file);
  }
}

}
