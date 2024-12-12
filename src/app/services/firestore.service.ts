import {inject, Injectable, signal} from '@angular/core';
import {addDoc, collection, doc, Firestore, onSnapshot, updateDoc} from '@angular/fire/firestore';
import {CustomerInterface} from '../types/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  customersList = signal<CustomerInterface[]>([]);
  addingCustomer = signal<boolean>(false);
  editingCustomer = signal<CustomerInterface | null>(null); // Сигнал текущего редактируемого клиента
  editingCustomerId = signal<string | null>(null); // Сигнал для ID редактируемого клиента

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

  async updateCustomer(id: string, updatedCustomer: Partial<CustomerInterface>): Promise<void> {
    try {
      const customerDoc = doc(this.firestore, `customersList/${id}`);
      await updateDoc(customerDoc, updatedCustomer);
      console.log('Данные клиента успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных клиента:', error);
      throw error;
    }
  }

  getCustomersList(): void {
    onSnapshot(this.customersListCollection, (snapshot) => {
      const customers = snapshot.docs.map((doc) => {
        const data = doc.data() as CustomerInterface;
        return {id: doc.id, ...data};
      });
      this.customersList.set(customers);
    }, (error) => {
      console.error('Ошибка при получении данных клиентов:', error);
    });
  }


  startEditingCustomer(customer: CustomerInterface, id: string): void {
    console.log('Редактирование клиента:', customer, 'с ID:', id);
    this.editingCustomer.set(customer);
    this.editingCustomerId.set(id);
  }

  stopEditingCustomer(): void {
    this.editingCustomer.set(null);
    this.editingCustomerId.set(null);
  }

}
