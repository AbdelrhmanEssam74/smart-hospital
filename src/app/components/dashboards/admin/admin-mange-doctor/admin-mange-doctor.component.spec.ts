import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMangeDoctorComponent } from './admin-mange-doctor.component';

describe('AdminMangeDoctorComponent', () => {
  let component: AdminMangeDoctorComponent;
  let fixture: ComponentFixture<AdminMangeDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMangeDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMangeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
