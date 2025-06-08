import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifiedDoctorComponent } from './qualified-doctor.component';

describe('QualifiedDoctorComponent', () => {
  let component: QualifiedDoctorComponent;
  let fixture: ComponentFixture<QualifiedDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualifiedDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualifiedDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
