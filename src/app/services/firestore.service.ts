import {inject, Injectable, signal} from '@angular/core';
import {addDoc, collection, Firestore, onSnapshot} from '@angular/fire/firestore';
import {CustomerInterface} from '../types/customer.interface';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  customersList = signal<CustomerInterface[]>([]);
  addingCustomer = signal<boolean>(false);

  private firestore = inject(Firestore);

  private customersListCollection = collection(this.firestore, 'customersList');

  async createCustomer(customer: CustomerInterface): Promise<void> {
    this.addingCustomer.set(true);
    try {
      await addDoc(this.customersListCollection, customer);
      console.log('Пользователь успешно добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении данных пользователя:', error);
      throw error;
    } finally {
      this.addingCustomer.set(false);
    }
  }

  getCustomersList(): void {
    onSnapshot(this.customersListCollection, (snapshot) => {
      const customers = snapshot.docs.map((doc) => {
        const {name, email, mobile, location} = doc.data();
        return {name, email, mobile, location} as CustomerInterface;
      });
      this.customersList.set(customers);
    }, (error) => {
      console.error('Ошибка при получении данных клиентов:', error);
    });
  }
}
