import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map} from 'rxjs';
import { User } from '../_models/user';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5288/api/';
  currentUser = signal<User | null> (null);

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'Account/Login', model).pipe(
      map(user => {
        if (user) {
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<Message>(this.baseUrl + 'Account/Register', model).pipe(
      map(message => {
        if (message) {
          localStorage.setItem('message', JSON.stringify(message));
        }
      })
    );
  }
  
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}