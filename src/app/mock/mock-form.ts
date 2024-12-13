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

export interface ValidationMessages {
  [field: string]: {
    [errorType: string]: string;
  };
}

export const VALIDATION_MESSAGES: ValidationMessages = {
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

type FormField = {
  name: string
  label: string;
  placeholder: string;
  type: string;
};

export const FORM_FIELDS: FormField[] = [
  {name: 'name', label: FORM_LABELS.name, placeholder: FORM_PLACEHOLDERS.name, type: 'text'},
  {name: 'email', label: FORM_LABELS.email, placeholder: FORM_PLACEHOLDERS.email, type: 'email'},
  {name: 'mobile', label: FORM_LABELS.mobile, placeholder: FORM_PLACEHOLDERS.mobile, type: 'text'},
  {name: 'location', label: FORM_LABELS.location, placeholder: FORM_PLACEHOLDERS.location, type: 'text'}
];
