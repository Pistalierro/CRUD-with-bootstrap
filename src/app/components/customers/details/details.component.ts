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
  form!: FormGroup;
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
        this.form.patchValue(customer);
      } else {
        this.form.reset();
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const editingCustomerId = this.firestoreService.editingCustomerId();
      if (editingCustomerId) {
        this.firestoreService
          .updateCustomer(editingCustomerId, this.form.value)
          .then(() => {
            console.log('Клиент успешно обновлён');
            this.firestoreService.stopEditingCustomer();

          });
      } else {
        this.firestoreService.createCustomer(this.form.value).then(() => {
          console.log('Клиент успешно добавлен');
          this.form.reset();
        });
      }
    }
  }

  cancelEditing(): void {
    this.firestoreService.stopEditingCustomer();
  }

  setValidationMessage(field: string): void {
    const control = this.form.get(field);
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
      const control = this.form.get(field);
      if (control && control.errors && (control.dirty || control.touched)) {
        const errorKey = Object.keys(control.errors)[0];
        errors[field] = VALIDATION_MESSAGES[field][errorKey] || '';
      }
    });
    this.validationMessages.set(errors);
  }

  getFormControl(fieldName: string): AbstractControl | null {
    return this.form.get(fieldName);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => this.updateValidationMessages());
  }
}
