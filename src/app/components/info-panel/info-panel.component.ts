import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FEATURES, TECHNOLOGIES} from '../../mock/mock-info';

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
  features: string[] = FEATURES;
  technologies: string[] = TECHNOLOGIES;
}
