import {Component, inject, OnInit} from '@angular/core';
import {FirestoreService} from '../../../services/firestore.service';
import {NgForOf, NgTemplateOutlet} from '@angular/common';

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
}
