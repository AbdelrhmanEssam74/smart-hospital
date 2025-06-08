import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifiedDoctorCardComponent } from './qualified-doctor-card.component';

describe('QualifiedDoctorCardComponent', () => {
  let component: QualifiedDoctorCardComponent;
  let fixture: ComponentFixture<QualifiedDoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualifiedDoctorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualifiedDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
