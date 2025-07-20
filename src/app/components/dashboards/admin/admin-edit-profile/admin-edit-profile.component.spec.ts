import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProfileComponent } from './admin-edit-profile.component';

describe('AdminEditProfileComponent', () => {
  let component: AdminEditProfileComponent;
  let fixture: ComponentFixture<AdminEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
