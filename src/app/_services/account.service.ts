import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5288/api/';

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'Account/Login', model);
  }
}
