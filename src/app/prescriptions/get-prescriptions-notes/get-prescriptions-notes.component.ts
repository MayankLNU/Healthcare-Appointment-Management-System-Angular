import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationService } from '../../_services/consultation.service';
import { Prescriptions } from '../../_models/prescriptions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-prescriptions-notes',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './get-prescriptions-notes.component.html',
  styleUrl: './get-prescriptions-notes.component.css'
})
export class GetPrescriptionsNotesComponent {

  private consultationService = inject(ConsultationService);
  prescriptionForm: FormGroup;
  prescription: Prescriptions | null = null;

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      AppointmentId: ['', Validators.required]
    });
  }

  getPrescriptionsAndNotes() {
    this.consultationService.getPrescriptionAndNotes(this.prescriptionForm.value).subscribe({
      next: response => {
        this.prescription = response;
      }
    });
  }
}
