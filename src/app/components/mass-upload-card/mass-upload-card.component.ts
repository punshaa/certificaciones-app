import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mass-upload-card',
  imports: [CommonModule],
  templateUrl: './mass-upload-card.html',
  styleUrl: './mass-upload-card.css'
})
export class MassUploadCardComponent {
  @Input() isLoading: boolean = false;
  selectedFileName: string = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
    }
  }

  clearFile() {
    this.selectedFileName = '';
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  uploadFile() {
    if (this.selectedFileName) {
      // Aquí se implementaría la lógica de subida del archivo
      console.log('Subiendo archivo:', this.selectedFileName);
      // Simular subida exitosa
      setTimeout(() => {
        this.clearFile();
        alert('Archivo subido exitosamente');
      }, 1000);
    }
  }
}
