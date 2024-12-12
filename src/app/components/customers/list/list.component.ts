import {Component, effect, inject, OnInit} from '@angular/core';
import {FirestoreService} from '../../../services/firestore.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  private firestoreService = inject(FirestoreService);

  ngOnInit() {
    this.getAndRefreshCustomersList();
  }

  private getAndRefreshCustomersList(): void {
    this.firestoreService.getCustomersList();
    effect(() => {
      console.log('Список клиентов обновился:', this.firestoreService.customersList());
    });
  }
}
