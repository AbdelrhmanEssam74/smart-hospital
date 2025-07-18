import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotComponent } from './add-slot.component';

describe('AddSlotComponent', () => {
  let component: AddSlotComponent;
  let fixture: ComponentFixture<AddSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
