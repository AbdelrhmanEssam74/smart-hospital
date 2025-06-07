import { Component } from '@angular/core';


@Component({
  selector: 'app-our-departments',
  imports: [
  ],
  templateUrl: './our-departments.component.html',
  styleUrl: './our-departments.component.css'
})
export class OurDepartmentsComponent {
  departments = [
    {
      iconClass: 'fas fa-brain',
      title: 'Neurology',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fas fa-eye',
      title: 'Eye Care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fas fa-procedures',
      title: 'Traumatology',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fas fa-tooth',
      title: 'Denteal care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fas fa-tint',
      title: 'Kidney',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fas fa-ear-listen',
      title: 'Ear Care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    }
  ];

}
