import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {DEFAULT_CUSTOMER, FORM_LABELS, FORM_PLACEHOLDERS} from '../../../mock/mock-form';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  form!: FormGroup;
  formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  firestoreService = inject(FirestoreService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(9)]],
      location: ['', [Validators.required]],
    });
    this.setControlValue();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.firestoreService.createCustomer(this.form.value).then();
      this.form.reset();
    }
  }

  private setControlValue = () => this.form.patchValue(DEFAULT_CUSTOMER);
}
