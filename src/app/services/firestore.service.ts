import {inject, Injectable, signal} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, orderBy, query, Timestamp, updateDoc} from '@angular/fire/firestore';
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
      const newCustomer = {...customer, createdAt: Timestamp.now()};
      await addDoc(this.customersListCollection, newCustomer);
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

  async deleteCustomer(id: string): Promise<void> {
    try {
      const customerDoc = doc(this.firestore, `customersList/${id}`);
      await deleteDoc(customerDoc);
      console.log(`Клиент с ID ${id} успешно удалён`);
    } catch (error) {
      console.error(`Ошибка при удалении клиента с ID ${id}:`, error);
      throw error;
    }
  }

  getCustomersList(): void {
    const customerQuery = query(this.customersListCollection, orderBy('createdAt', 'asc'));

    onSnapshot(customerQuery, (snapshot) => {
      const customers = snapshot.docs.map((doc) => {
        const data = doc.data() as CustomerInterface;
        return {
          id: doc.id, ...data, createdAt: data.createdAt ? data.createdAt.toDate() : new Date(0),
        };
      });
      this.customersList.set(customers);
    }, (error) => {
      console.error('Ошибка при получении данных клиентов:', error);
    });
  }


  startEditingCustomer(customer: CustomerInterface, id: string): void {
    this.editingCustomer.set(customer);
    this.editingCustomerId.set(id);
  }

  stopEditingCustomer(): void {
    this.editingCustomer.set(null);
    this.editingCustomerId.set(null);
  }

}
