import { Injectable } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatedBookingDetailsService {

  private updatedAppointmentDetailsSource = new BehaviorSubject<Appointment | null>(null);
    updatedAppointmentDetails$ = this.updatedAppointmentDetailsSource.asObservable();
  
    setAppointmentDetails(details: Appointment) {
      this.updatedAppointmentDetailsSource.next(details);
    }
}
