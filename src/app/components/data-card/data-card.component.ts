import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-card',
  imports: [CommonModule],
  templateUrl: './data-card.html',
  styleUrl: './data-card.css'
})
export class DataCardComponent {
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input() count: number = 0;
  @Input() icon: string = '';
  @Input() updatedDate: string = '';
}
