import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../_models/appointment';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {

  private appointmentDetailsSource = new BehaviorSubject<Appointment | null>(null);
  appointmentDetails$ = this.appointmentDetailsSource.asObservable();

  setAppointmentDetails(details: Appointment | null) {
    this.appointmentDetailsSource.next(details);
  }
}