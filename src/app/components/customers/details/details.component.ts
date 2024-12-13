import {Component, effect, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDERS, VALIDATION_MESSAGES} from '../../../mock/mock-form';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  form!: FormGroup;
  formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = VALIDATION_MESSAGES;


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
    console.log(this.form);
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

  setValidationMessage(): void {
    Object.keys(this.formErrors).forEach((filed: string) => {
      const control = this.form.get(filed);
      this.formErrors[filed] = '';

      if ((control?.dirty || control?.touched) && control.invalid) {
        const messages = this.validationMessages[filed];

        Object.keys(control.errors as ValidationErrors).some(key => this.formErrors[filed] = messages[key]);
      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => this.setValidationMessage());
  }
}
