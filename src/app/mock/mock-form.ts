import {CustomerInterface} from '../types/customer.interface';

export const DEFAULT_CUSTOMER: CustomerInterface = {
  name: 'Default Name',
  email: 'default@email.com',
  mobile: '987654321',
  location: 'Default Location',
};

export const FORM_LABELS = {
  name: 'Имя',
  email: 'Email',
  mobile: 'Телефон',
  location: 'Местоположение'
};

export const FORM_PLACEHOLDERS = {
  name: 'Введите имя клиента...',
  email: 'Укажите адрес электронной почты...',
  mobile: 'Номер мобильного телефона...',
  location: 'Укажите город...'
};
