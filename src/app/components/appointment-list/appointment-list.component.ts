import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = ''
  newAppointmentDate: Date = new Date();

  appointments: Array<Appointment> = [{
    id: 1,
    title: 'Job interview with Vengresso',
    date: new Date('2023-08-15'),
  }];

  ngOnInit(): void {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
    }
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.appointments.push(newAppointment)

      localStorage.setItem('appointments', JSON.stringify(this.appointments));

      this.newAppointmentDate = new Date("yyyy-MM-dd")
      this.newAppointmentTitle = ''
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1)
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
