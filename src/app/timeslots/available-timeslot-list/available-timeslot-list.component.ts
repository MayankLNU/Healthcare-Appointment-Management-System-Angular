// available-timeslot-list.component.ts
import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { AvailabilityService } from '../../_services/availability.service';
import { AppointmentService } from '../../_services/appointment.service';
import { BookingDetailsService } from '../../_services/booking-details.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { Appointment } from '../../_models/appointment';
import { AvailableSlots } from '../../_models/availableslots';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-available-timeslot-list',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './available-timeslot-list.component.html',
  styleUrls: ['./available-timeslot-list.component.css'],
  providers: [DatePipe]
})
export class AvailableTimeslotListComponent {
  accountService = inject(AccountService);
  private availabilityService = inject(AvailabilityService);
  private appointmentService = inject(AppointmentService);
  private bookingDetailsService = inject(BookingDetailsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  dateForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  availabilityList: AvailableSlots[] = [];
  submit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue'
    };
    this.dateForm = this.fb.group({
      Date: ['', Validators.required]
    });
  }

  getBookedSlots() {
    const date = new Date(this.dateForm.value.Date);
    const formattedDate = date.toISOString().split('T')[0];

    const model = {
      Date: formattedDate
    };

    this.availabilityService.getAvailableSlots(model).subscribe({
      next: availabilityList => this.availabilityList = availabilityList
    });

    this.submit = true;
  }

  bookSlot(availability: AvailableSlots) {
    const model = {
      Date: availability.date,
      StartTime: availability.startTime,
      DoctorId: availability.doctorId,
      PatientEmail: this.accountService.currentUser()?.email
    };

    this.appointmentService.bookAppointment(model).subscribe({
      next: response => {
        this.bookingDetailsService.setAppointmentDetails(response);
        this.toastr.success("Slot Booked Successfully.\nPlease go to Book Appointment section for Booking Details.");
        this.router.navigateByUrl('/book-appointment');
      }
    });
  }

  formatTime(time: string): string | null {
    const datePipe = new DatePipe('en-US');
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return datePipe.transform(date, 'hh:mm a');
  }
}
