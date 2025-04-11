import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './_services/account.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './user.interface/footer/footer.component';
import { NavComponent } from './user.interface/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}



