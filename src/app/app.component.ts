import {Component} from '@angular/core';
import {HostComponent} from './components/customers/host/host.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HostComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
