import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveDoctorMessageComponent } from './inactive-doctor-message.component';

describe('InactiveDoctorMessageComponent', () => {
  let component: InactiveDoctorMessageComponent;
  let fixture: ComponentFixture<InactiveDoctorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactiveDoctorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveDoctorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
