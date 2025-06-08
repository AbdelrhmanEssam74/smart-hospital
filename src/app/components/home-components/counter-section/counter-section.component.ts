import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-counter-section',
  imports: [],
  templateUrl: './counter-section.component.html',
  styleUrl: './counter-section.component.css',
  standalone: true
})
export class CounterSectionComponent implements AfterViewInit {
  @ViewChild('counterSection') counterSection!: ElementRef;
  hasAnimated = false;
  counters = [
    {icon: 'fa-regular fa-tooth', value: 3236, label: 'Saved Tooth'},
    {icon: 'fa-solid fa-stomach', value: 999, label: 'Saved Kidny'},
    {icon: 'fa-solid fa-baby', value: 2500, label: 'Saved Child'},
    {icon: 'fa-solid fa-brain-circuit', value: 500, label: 'Saved Brain'}
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCounters();
          this.hasAnimated = true;
        }
      });
    }, {threshold: 0.3});

    observer.observe(this.counterSection.nativeElement);
  }

  animateCounters() {
    this.counters.forEach((counter, index) => {
      const target = counter.value;
      let current = 0;
      const step = Math.ceil(target / 50);
      const element = document.getElementById(`counter-${index}`);
      const interval = setInterval(() => {
        current += step;
        if (element) {
          element.innerText = current >= target ? target.toString() : current.toString();
        }
        if (current >= target) {
          clearInterval(interval);
        }
      }, 30);
    });
  }
}
