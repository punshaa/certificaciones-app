import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentPageTitle: string = 'Certificaciones';
  isUserMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageTitle(event.url);
      });
  }

  ngOnDestroy(): void {
    // Cleanup si es necesario
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userProfile = target.closest('.user-profile');
    const userDropdown = target.closest('.user-dropdown');
    
    if (!userProfile && !userDropdown && this.isUserMenuOpen) {
      this.closeUserMenu();
    }
  }

  private updatePageTitle(url: string): void {
    switch (url) {
      case '/dashboard':
        this.currentPageTitle = 'Dashboard';
        break;
      case '/certifications-list':
        this.currentPageTitle = 'Certificaciones';
        break;
      case '/certification-form':
        this.currentPageTitle = 'Nueva Certificación';
        break;
      default:
        this.currentPageTitle = 'Certificaciones';
        break;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    console.log('Menú del usuario:', this.isUserMenuOpen ? 'abierto' : 'cerrado');
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  logout(): void {
    console.log('Iniciando logout...');
    
    // Cerrar el menú
    this.closeUserMenu();
    
    // Limpiar cualquier dato de sesión si es necesario
    // localStorage.clear(); // Descomenta si necesitas limpiar datos
    
    // Redirigir al login
    this.router.navigate(['/']).then(() => {
      console.log('Redirección al login completada');
    }).catch(error => {
      console.error('Error al redirigir:', error);
    });
  }
}
