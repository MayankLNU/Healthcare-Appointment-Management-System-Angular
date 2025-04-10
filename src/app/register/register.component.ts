import { Component, inject, OnInit, output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  model: any = {}
  validationErrors: string[] = [];
  registerForm: FormGroup = new FormGroup({});
  gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [ Validators.required, Validators.pattern(this.gmailPattern)]],
      Role: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
        this.toastr.success("Successfully Registered. Please Login!");
        this.cancel();
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
