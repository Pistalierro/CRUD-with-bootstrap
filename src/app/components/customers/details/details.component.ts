import {Component, effect, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {FORM_LABELS, FORM_PLACEHOLDERS} from '../../../mock/mock-form';
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

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(9)]],
      location: ['', [Validators.required]],
    });
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
}
