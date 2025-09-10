import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CertificationsListComponent } from './components/certifications-list/certifications-list.component';
import { CertificationFormComponent } from './components/certification-form/certification-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'certifications-list', component: CertificationsListComponent },
  { path: 'certification-form', component: CertificationFormComponent },
  { path: '**', redirectTo: '' }
];
