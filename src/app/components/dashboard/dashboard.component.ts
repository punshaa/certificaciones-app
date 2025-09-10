import { Component, OnInit } from '@angular/core';
import { DataCardComponent } from '../data-card/data-card.component';
import { MassUploadCardComponent } from '../mass-upload-card/mass-upload-card.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [DataCardComponent, MassUploadCardComponent, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  isLoading = true;

  constructor(public sidebarService: SidebarService) {}

  ngOnInit() {
    // Simular carga de datos
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
