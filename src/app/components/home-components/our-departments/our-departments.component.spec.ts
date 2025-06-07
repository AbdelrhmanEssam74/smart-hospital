import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDepartmentsComponent } from './our-departments.component';

describe('OurDepartmentsComponent', () => {
  let component: OurDepartmentsComponent;
  let fixture: ComponentFixture<OurDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurDepartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
