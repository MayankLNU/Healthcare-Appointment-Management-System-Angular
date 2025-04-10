import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AvailabilityService } from '../_services/availability.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Availability } from '../_models/availability';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-availability',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-availability.component.html',
  styleUrl: './add-availability.component.css'
})
export class AddAvailabilityComponent {
  private accountService = inject(AccountService);
  private availabilityService = inject(AvailabilityService);
  private toastr = inject(ToastrService);
  addAvailabilityForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue'
    };
    this.addAvailabilityForm = this.fb.group({
      Date: ['', Validators.required],
      StartTime: ['',Validators.required],
      EndTime: ['',Validators.required]
    });
  }

  addAvailability(){
    const date = new Date(this.addAvailabilityForm.value.Date);
    const formattedDate = date.toISOString().split('T')[0];

    const model = {
      Email: this.accountService.currentUser()?.email,
      Date: formattedDate,
      StartTime: this.addAvailabilityForm.value.StartTime + ':00',
      EndTime: this.addAvailabilityForm.value.EndTime + ':00'
    };

    this.availabilityService.addAvailability(model).subscribe({
      next: response => {
        this.toastr.success("Time Slots Added Successfully.");
      }
    });
  }
}
