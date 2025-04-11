import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Appointment } from '../_models/appointment';
import { map } from 'rxjs';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = 'http://localhost:5288/api/';

  bookAppointment(model: any) {
    return this.http.post<Appointment>(this.baseUrl + 'Patient/Book-Appointment', model, this.getHttpOptions()).pipe(
          map(appointment => {
            if (appointment) {
              localStorage.setItem('appointment', JSON.stringify(appointment));
            }
            return appointment;
          })
        );
  }

  updateAppointment(model: any) {
    return this.http.put<Appointment>(this.baseUrl + 'Patient/Update-Appointment', model, this.getHttpOptions()).pipe(
          map(appointment => {
            if (appointment) {
              localStorage.setItem('appointment', JSON.stringify(appointment));
            }
            return appointment;
          })
        );
  }

  cancelAppointment(model: any) {
    return this.http.post<Message>(this.baseUrl + 'Patient/Cancel-Appointment', model, this.getHttpOptions()).pipe(
      map(message => {
        if (message) {
          localStorage.setItem('message', JSON.stringify(message));
        }
      })
    );
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.jwtToken}`
      })
    };
  }
}
