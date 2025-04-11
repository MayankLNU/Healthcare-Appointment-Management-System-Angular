import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { AvailabilityService } from '../../_services/availability.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remove-timeslot',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './remove-timeslot.component.html',
  styleUrl: './remove-timeslot.component.css'
})
export class RemoveTimeslotComponent {
  private accountService = inject(AccountService);
  private availabilityService = inject(AvailabilityService);
  private toastr = inject(ToastrService);
  removeAvailabilityForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue'
    };
    this.removeAvailabilityForm = this.fb.group({
      Date: ['', Validators.required],
      StartTime: ['',Validators.required]
    });
  }

  removeAvailability(){
    const date = new Date(this.removeAvailabilityForm.value.Date);
    const formattedDate = date.toISOString().split('T')[0];

    const model = {
      DoctorEmail: this.accountService.currentUser()?.email,
      Date: formattedDate,
      StartTime: this.removeAvailabilityForm.value.StartTime + ':00'
    };

    this.availabilityService.removeSlot(model).subscribe({
      next: response => {
        this.toastr.success("Time Slots Removed Successfully.");
      }
    });
  }
}
