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

export const FORM_ERRORS = {
  name: '',
  email: '',
  mobile: '',
  location: '',
};

export const VALIDATION_MESSAGES = {
  name: {
    required: 'Имя обязательно',
    minlength: 'Имя должно содержать минимум 6 символов'
  },
  email: {
    required: 'Email обязателен',
    email: 'Неверный формат электронной почты'
  },
  mobile: {
    required: 'Телефон обязателен',
    minlength: 'Номер телефона должен содержать минимум 10 цифр',
  },
  location: {
    required: 'Локация обязательна'
  }
};
