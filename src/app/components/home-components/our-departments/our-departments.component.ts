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
      iconClass: 'fa-regular fa-brain',
      title: 'Neurology',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fa-regular fa-eye',
      title: 'Eye Care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {

      iconClass: 'fa-regular fa-bone-break',
      title: 'Traumatology',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fa-regular fa-tooth',
      title: 'Denteal care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fa-regular fa-stomach',
      title: 'Kidney',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    },
    {
      iconClass: 'fa-regular fa-ear',
      title: 'Ear Care',
      description: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Nullam sit amet nunc felis,'
    }
  ];

}
