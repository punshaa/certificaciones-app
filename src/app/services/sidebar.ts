import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isCollapsed = signal(true); // Iniciar contraído por defecto

  get isCollapsed() {
    return this._isCollapsed.asReadonly();
  }

  toggle() {
    this._isCollapsed.set(!this._isCollapsed());
  }

  collapse() {
    this._isCollapsed.set(true);
  }

  expand() {
    this._isCollapsed.set(false);
  }
}