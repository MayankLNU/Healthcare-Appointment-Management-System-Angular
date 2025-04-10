import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Message } from '../_models/message';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = 'http://localhost:5288/api/';

  addPrescriptionAndNotes (model: any){
      return this.http.post<Message>(this.baseUrl + 'Doctor/Add-Prescriptons-And-Notes', model, this.getHttpOptions()).pipe(
        map(
          message => {
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
