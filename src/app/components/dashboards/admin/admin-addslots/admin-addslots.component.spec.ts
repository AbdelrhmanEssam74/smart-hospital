import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddslotsComponent } from './admin-addslots.component';

describe('AdminAddslotsComponent', () => {
  let component: AdminAddslotsComponent;
  let fixture: ComponentFixture<AdminAddslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddslotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
