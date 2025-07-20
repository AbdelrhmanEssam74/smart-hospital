import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactsComponent } from './admin-contact.component';

describe('ContactComponent', () => {
  let component: AdminContactsComponent;
  let fixture: ComponentFixture<AdminContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
