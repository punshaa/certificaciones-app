import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar';

interface TrainingPath {
  name: string;
  modules: number;
  url: string;
}

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './certification-form.html',
  styleUrl: './certification-form.css'
})
export class CertificationFormComponent implements OnInit {
  certificationForm: FormGroup;
  trainingPaths: TrainingPath[] = [];
  newPath: TrainingPath = { name: '', modules: 0, url: '' };
  pathPageSize: number = 5;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public sidebarService: SidebarService
  ) {
    this.certificationForm = this.fb.group({
      name: ['', [Validators.required]],
      certifyingBody: ['', [Validators.required]],
      official: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      certificationId: ['', [Validators.required]],
      observations: ['']
    });
  }

  ngOnInit(): void {
    // Inicialización del componente
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.certificationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFormValid(): boolean {
    return this.certificationForm.valid;
  }

  isPathFormValid(): boolean {
    return this.newPath.name.trim() !== '' && 
           this.newPath.modules > 0 && 
           this.newPath.url.trim() !== '';
  }

  addTrainingPath(): void {
    if (this.isPathFormValid()) {
      this.trainingPaths.push({ ...this.newPath });
      this.newPath = { name: '', modules: 0, url: '' };
    }
  }

  editPath(index: number): void {
    const path = this.trainingPaths[index];
    this.newPath = { ...path };
    this.deletePath(index);
  }

  deletePath(index: number): void {
    this.trainingPaths.splice(index, 1);
  }

  getPathPageInfo(): string {
    const total = this.trainingPaths.length;
    return `1 - ${total} de ${total}`;
  }

  goBack(): void {
    this.router.navigate(['/certifications-list']);
  }

  onSubmit(): void {
    if (this.certificationForm.valid) {
      const formData = {
        ...this.certificationForm.value,
        trainingPaths: this.trainingPaths
      };
      
      console.log('Datos del formulario:', formData);
      
      // Aquí implementarías la lógica para guardar la certificación
      alert('Certificación registrada exitosamente');
      this.router.navigate(['/certifications-list']);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.certificationForm.controls).forEach(key => {
        this.certificationForm.get(key)?.markAsTouched();
      });
    }
  }
}