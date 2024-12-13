import {Component} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {DetailsComponent} from '../details/details.component';
import {InfoPanelComponent} from '../../info-panel/info-panel.component';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    ListComponent,
    DetailsComponent,
    InfoPanelComponent
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent {

}
