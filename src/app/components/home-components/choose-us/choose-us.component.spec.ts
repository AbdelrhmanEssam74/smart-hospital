import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUsComponent } from './choose-us.component';

describe('ChooseUsComponent', () => {
  let component: ChooseUsComponent;
  let fixture: ComponentFixture<ChooseUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
