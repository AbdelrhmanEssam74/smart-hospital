import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorsComponent } from './admin-doctors.component';

describe('AdminDoctorsComponent', () => {
  let component: AdminDoctorsComponent;
  let fixture: ComponentFixture<AdminDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
