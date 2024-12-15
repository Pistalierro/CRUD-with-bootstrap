import {Component, inject} from '@angular/core';
import {HostComponent} from './components/customers/host/host.component';
import {NgIf} from '@angular/common';
import {ErrorSignalService} from './services/error-signal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HostComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  errorService = inject(ErrorSignalService);

  clearError() {
    this.errorService.clearError();
  }
}
