import {inject, Injectable, signal} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, orderBy, query, Timestamp, updateDoc} from '@angular/fire/firestore';
import {CustomerInterface} from '../types/customer.interface';
import {ErrorSignalService} from './error-signal.service';

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
  private errorService = inject(ErrorSignalService);

  async createCustomer(customer: CustomerInterface): Promise<void> {
    this.addingCustomer.set(true);
    try {
      const newCustomer = {...customer, createdAt: Timestamp.now()};
      await addDoc(this.customersListCollection, newCustomer);
      console.log('Пользователь успешно добавлен');
    } catch (err) {
      this.errorService.setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      this.addingCustomer.set(false);
    }
  }

  async updateCustomer(id: string, updatedCustomer: Partial<CustomerInterface>): Promise<void> {
    try {
      const customerDoc = doc(this.firestore, `customersList/${id}`);
      await updateDoc(customerDoc, updatedCustomer);
      console.log('Данные клиента успешно обновлены');
    } catch (err) {
      this.errorService.setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      const customerDoc = doc(this.firestore, `customersList/${id}`);
      await deleteDoc(customerDoc);
      console.log(`Клиент с ID ${id} успешно удалён`);
    } catch (err: any) {
      this.errorService.setError(err instanceof Error ? err : new Error(String(err)));
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
      }
    );
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
