import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppointmentService } from '../_services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Appointment } from '../_models/appointment';

@Component({
  selector: 'app-book-appointment',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  private toastr = inject(ToastrService);
  private accountService = inject(AccountService);
  appointmentDetails: Appointment | null = null;
  bookAppointmentForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue'
    };
    this.bookAppointmentForm = this.fb.group({
      Date: ['', Validators.required],
      StartTime: ['',Validators.required],
      DoctorId: ['',Validators.required]
    });
  }

  bookAppointment(){
    const date = new Date(this.bookAppointmentForm.value.Date);
    const formattedDate = date.toISOString().split('T')[0];

    const model = {
      Date: formattedDate,
      StartTime: this.bookAppointmentForm.value.StartTime + ':00',
      DoctorId: this.bookAppointmentForm.value.DoctorId,
      PatientEmail: this.accountService.currentUser()?.email
    };

    this.appointmentService.bookAppointment(model).subscribe({
      next: response => {
        this.appointmentDetails = response;
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
