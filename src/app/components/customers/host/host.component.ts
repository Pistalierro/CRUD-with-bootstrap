import {Component} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {DetailsComponent} from '../details/details.component';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    ListComponent,
    DetailsComponent
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent {

}
