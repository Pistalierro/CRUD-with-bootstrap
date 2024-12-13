import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})
export class InfoPanelComponent {
  features: string[] = [
    'Добавление клиента с обязательными полями: имя, email, телефон и город.',
    'Редактирование данных клиента прямо в форме.',
    'Удаление клиента из базы данных.',
    'Все данные автоматически обновляются в списке в реальном времени.',
    'Поддержка адаптивного интерфейса для работы на мобильных устройствах.',
  ];

  technologies: string[] = [
    'Angular — фреймворк для создания одностраничного приложения.',
    'Signals — для реактивного управления состоянием данных.',
    'RxJS — для работы с потоками данных и событий.',
    'Bootstrap 5.3.3 — для адаптивной верстки и стилизации интерфейса.',
    'Font Awesome — для иконок в интерфейсе.',
    'Firebase Firestore — для хранения данных клиентов.',
  ];
}
