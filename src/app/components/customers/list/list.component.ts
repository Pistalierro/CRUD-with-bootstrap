import {Component, inject, OnInit} from '@angular/core';
import {FirestoreService} from '../../../services/firestore.service';
import {DatePipe, NgForOf, NgTemplateOutlet} from '@angular/common';
import {CustomerInterface} from '../../../types/customer.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet,
    DatePipe
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

  deleteCustomer(id: string): void {
    if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
      this.firestoreService.deleteCustomer(id).then(() => {
        console.log(`Клиент с ID ${id} успешно удалён`);
      }).catch((error) => {
        console.error(`Ошибка при удалении клиента с ID ${id}:`, error);
      });
    }
  }
}
