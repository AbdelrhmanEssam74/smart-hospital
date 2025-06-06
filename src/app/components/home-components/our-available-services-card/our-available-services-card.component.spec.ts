import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAvailableServicesCardComponent } from './our-available-services-card.component';

describe('OurAvailableServicesCardComponent', () => {
  let component: OurAvailableServicesCardComponent;
  let fixture: ComponentFixture<OurAvailableServicesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurAvailableServicesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurAvailableServicesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
