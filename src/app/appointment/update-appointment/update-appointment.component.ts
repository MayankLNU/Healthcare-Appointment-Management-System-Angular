import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../_services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Appointment } from '../../_models/appointment';
import { BookingDetailsService } from '../../_services/booking-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-appointment',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  private toastr = inject(ToastrService);
  private accountService = inject(AccountService);
  private bookingDetailsService = inject(BookingDetailsService);
  private router = inject(Router);
  updateAppointmentForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue'
    };

    this.updateAppointmentForm = this.fb.group({
      AppointmentId: ['', Validators.required],
      DoctorId:['', Validators.required],
      Date: ['', Validators.required],
      StartTime: ['', Validators.required]
    });
  }

  updateAppointment() {
    const date = new Date(this.updateAppointmentForm.value.Date);
    const formattedDate = date.toISOString().split('T')[0];

    const model = {
      AppointmentId: this.updateAppointmentForm.value.AppointmentId,
      Date: formattedDate,
      StartTime: this.updateAppointmentForm.value.StartTime + ':00',
      DoctorId: this.updateAppointmentForm.value.DoctorId,
      PatientEmail: this.accountService.currentUser()?.email
    };

    this.appointmentService.updateAppointment(model).subscribe({
      next: response => {
        this.bookingDetailsService.setAppointmentDetails(response);
        this.toastr.success("Booking Updated Successfully.\nPlease go to Book Appointment section for Booking Details.");
        this.router.navigateByUrl('/book-appointment');
      }
    });
  }

  formatTime(time: string): string | null{
    const datePipe = new DatePipe('en-US');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return datePipe.transform(date, 'hh:mm a');
  }
}
