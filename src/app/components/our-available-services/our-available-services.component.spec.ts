import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAvailableServicesComponent } from './our-available-services.component';

describe('OurAvailableServicesComponent', () => {
  let component: OurAvailableServicesComponent;
  let fixture: ComponentFixture<OurAvailableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurAvailableServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurAvailableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
