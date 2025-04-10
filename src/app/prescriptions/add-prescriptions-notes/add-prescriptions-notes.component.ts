import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultationService } from '../../_services/consultation.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-prescriptions-notes',
  imports: [BsDatepickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-prescriptions-notes.component.html',
  styleUrl: './add-prescriptions-notes.component.css'
})
export class AddPrescriptionsNotesComponent {
  private consultationService = inject(ConsultationService);
  private toastr = inject(ToastrService);
  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      AppointmentId: ['', Validators.required],
      Prescription: ['',Validators.required],
      Notes: ['',Validators.required]
    });
  }

  addPrescriptionsAndNotes() {
    this.consultationService.addPrescriptionAndNotes(this.prescriptionForm.value).subscribe({
      next: response => {
        this.toastr.success("Consultation completed successfully");
      }
    });
  }
}
