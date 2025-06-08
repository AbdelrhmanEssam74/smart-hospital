import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSectionComponent } from './counter-section.component';

describe('CounterSectionComponent', () => {
  let component: CounterSectionComponent;
  let fixture: ComponentFixture<CounterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
