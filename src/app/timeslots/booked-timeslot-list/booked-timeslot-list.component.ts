import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AvailabilityService } from '../../_services/availability.service';
import { AccountService } from '../../_services/account.service';
import { Availability } from '../../_models/availability';

@Component({
  selector: 'app-booked-timeslot-list',
  templateUrl: './booked-timeslot-list.component.html',
  styleUrls: ['./booked-timeslot-list.component.css'],
  standalone: true,
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  providers: [DatePipe]
})
export class BookedTimeslotListComponent {
  private accountService = inject(AccountService);
  private availabilityService = inject(AvailabilityService);
  dateForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  availabilityList: Availability[] = [];
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
      Date: formattedDate,
      DoctorEmail: this.accountService.currentUser()?.email
    };

    this.availabilityService.getBookedSlots(model).subscribe({
      next: availabilityList => this.availabilityList = availabilityList
    });

    this.submit = true;
  }

  formatTime(time: string): string | null{
    const datePipe = new DatePipe('en-US');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return datePipe.transform(date, 'hh:mm a');
  }
}
