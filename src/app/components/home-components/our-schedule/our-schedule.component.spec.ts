import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurScheduleComponent } from './our-schedule.component';

describe('OurScheduleComponent', () => {
  let component: OurScheduleComponent;
  let fixture: ComponentFixture<OurScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
