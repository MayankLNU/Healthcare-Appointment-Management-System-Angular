import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Availability } from '../_models/availability';
import { AccountService } from './account.service';
import { AvailableSlots } from '../_models/availableslots';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = 'http://localhost:5288/api/';

  getBookedSlots(model: any): Observable<Availability[]> {
    return this.http.post<Availability[]>(this.baseUrl + 'Doctor/Booked-Slots', model, this.getHttpOptions()).pipe(
      map(availability => {
        if (availability) {
          localStorage.setItem('user', JSON.stringify(availability));
        }
        return availability;
      })
    );
  }

  getAvailableSlots(model: any): Observable<AvailableSlots[]> {
    return this.http.get<AvailableSlots[]>(this.baseUrl + 'Patient/Available-Slots/' + model.Date, this.getHttpOptions()).pipe(
      map(availableSlots => {
        if (availableSlots) {
          localStorage.setItem('user', JSON.stringify(availableSlots));
        }
        return availableSlots;
      })
    );
  }

  addAvailability(model: any){
    return this.http.post<Message>(this.baseUrl + 'Doctor/Add-Availability', model, this.getHttpOptions()).pipe(
      map(
        message => {
          if (message) {
            localStorage.setItem('message', JSON.stringify(message));
          }
        })
      );
  }

  removeSlot(model: any) {
    return this.http.delete<Message>(this.baseUrl + 'Doctor/Remove-Slot', { body: model, ...this.getHttpOptions() }).pipe(
  
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
