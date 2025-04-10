import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { AvailabilityService } from '../../_services/availability.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { AvailableSlots } from '../../_models/availableslots';

@Component({
  selector: 'app-available-timeslot-list',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './available-timeslot-list.component.html',
  styleUrl: './available-timeslot-list.component.css',
  providers: [DatePipe]
})
export class AvailableTimeslotListComponent {
  accountService = inject(AccountService);
  private availabilityService = inject(AvailabilityService);
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

  formatTime(time: string): string | null{
    const datePipe = new DatePipe('en-US');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return datePipe.transform(date, 'hh:mm a');
  }
}