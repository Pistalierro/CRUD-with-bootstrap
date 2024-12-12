import {Component, inject, OnInit} from '@angular/core';
import {FirestoreService} from '../../../services/firestore.service';
import {NgForOf, NgTemplateOutlet} from '@angular/common';
import {CustomerInterface} from '../../../types/customer.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  firestoreService = inject(FirestoreService);

  ngOnInit() {
    this.firestoreService.getCustomersList();
  }

  editCustomer(customer: CustomerInterface, id: string): void {
    this.firestoreService.startEditingCustomer(customer, id);
  }

  cancelEdit(): void {
  }

  saveCustomer(): void {
  }

  deleteCustomer(): void {
  }
}
