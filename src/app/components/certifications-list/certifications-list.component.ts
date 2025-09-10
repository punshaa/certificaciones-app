import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar';

interface Certification {
  id: number;
  name: string;
  course: string;
  details: string;
  expiration: string;
  hours: string;
}

@Component({
  selector: 'app-certifications-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './certifications-list.html',
  styleUrl: './certifications-list.css'
})
export class CertificationsListComponent implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  
  certifications: Certification[] = [
    {
      id: 1,
      name: 'Azure Fundamentales',
      course: 'Azure',
      details: 'Microsoft',
      expiration: '24/01/2024',
      hours: '40h'
    },
    {
      id: 2,
      name: 'Design Thinking Enterprise',
      course: 'QCI',
      details: 'Marcela',
      expiration: '30/11/2023',
      hours: '16h'
    }
  ];

  filteredCertifications: Certification[] = [];

  constructor(
    private router: Router,
    public sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.filteredCertifications = [...this.certifications];
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCertifications = [...this.certifications];
    } else {
      this.filteredCertifications = this.certifications.filter(cert => 
        cert.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cert.course.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cert.details.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  goToAddCertification(): void {
    this.router.navigate(['/certification-form']);
  }

  editCertification(certification: Certification): void {
    this.router.navigate(['/certification-form'], { 
      queryParams: { id: certification.id, mode: 'edit' } 
    });
  }

  deleteCertification(certification: Certification): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la certificación "${certification.name}"?`)) {
      this.certifications = this.certifications.filter(cert => cert.id !== certification.id);
      this.onSearch();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCertifications.length / this.pageSize);
  }

  getPageInfo(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.filteredCertifications.length);
    return `${start} - ${end} de ${this.filteredCertifications.length}`;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}