import {Component, effect, OnInit, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS, VALIDATION_MESSAGES} from '../../../mock/mock-form';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  customerForm!: FormGroup;
  formFields = FORM_FIELDS;
  formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;

  validationMessages = signal<Record<string, string>>({
    name: '',
    email: '',
    mobile: '',
    location: ''
  });

  constructor(public firestoreService: FirestoreService, private fb: FormBuilder) {
    effect(() => {
      const customer = this.firestoreService.editingCustomer();
      if (customer) {
        this.customerForm.patchValue(customer);
      } else {
        this.customerForm.reset();
      }
    });
  }

  form(fieldName: string): AbstractControl | null {
    return this.customerForm.get(fieldName);
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const editingCustomerId = this.firestoreService.editingCustomerId();
      if (editingCustomerId) {
        this.firestoreService
          .updateCustomer(editingCustomerId, this.customerForm.value)
          .then(() => {
            console.log('Клиент успешно обновлён');
            this.firestoreService.stopEditingCustomer();

          });
      } else {
        this.firestoreService.createCustomer(this.customerForm.value).then(() => {
          console.log('Клиент успешно добавлен');
          this.customerForm.reset();
        });
      }
    }
  }

  cancelEditing(): void {
    this.firestoreService.stopEditingCustomer();
  }

  setValidationMessage(field: string): void {
    const control = this.customerForm.get(field);
    control?.markAsTouched();
    if ((control?.dirty || control?.touched) && control.errors) {
      const errorKey = Object.keys(control.errors)[0];
      this.validationMessages.set({
        ...this.validationMessages(),
        [field]: VALIDATION_MESSAGES[field][errorKey] || ''
      });
    }
  }

  updateValidationMessages(): void {
    const errors: { name: string; email: string; mobile: string; location: string } = {name: '', email: '', mobile: '', location: ''};
    (Object.keys(errors) as Array<keyof typeof errors>).forEach((field) => {
      const control = this.customerForm.get(field);
      if (control && control.errors && (control.dirty || control.touched)) {
        const errorKey = Object.keys(control.errors)[0];
        errors[field] = VALIDATION_MESSAGES[field][errorKey] || '';
      }
    });
    this.validationMessages.set(errors);
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]],
    });
    this.customerForm.valueChanges.subscribe(() => this.updateValidationMessages());
  }
}
