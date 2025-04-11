import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  loginForm: FormGroup;
  gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      Email: ['', [ Validators.required, Validators.pattern(this.gmailPattern)]],
      Password: ['', Validators.required]
    });
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  get currentUser() {
    return this.accountService.currentUser();
  }
}
