import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../_services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-appointment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.css'
})
export class CancelAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  private toastr = inject(ToastrService);
  private accountService = inject(AccountService);
  appointmentIdForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appointmentIdForm = this.fb.group({
      AppointmentId: ['', Validators.required]
    });
  }

  cancelAppointment() {
    const model = {
      AppointmentId: this.appointmentIdForm.value.AppointmentId,
      PatientEmail: this.accountService.currentUser()?.email
    };

    this.appointmentService.cancelAppointment(model).subscribe({
      next: message => {
        this.toastr.success("Appointment cancelled successfully");
      }
    });
  }
}
