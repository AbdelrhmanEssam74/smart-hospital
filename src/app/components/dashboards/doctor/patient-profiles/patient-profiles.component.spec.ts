import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfilesComponent } from './patient-profiles.component';

describe('PatientProfilesComponent', () => {
  let component: PatientProfilesComponent;
  let fixture: ComponentFixture<PatientProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
