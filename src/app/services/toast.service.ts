import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  public toast$ = this.toastSubject.asObservable();
  private toastId = 0;

  showToast(message: string, type: ToastType = 'info'): void {
    const toast: Toast = {
      message,
      type,
      id: this.toastId++
    };
    this.toastSubject.next(toast);
  }

  success(message: string): void {
    this.showToast(message, 'success');
  }

  error(message: string): void {
    this.showToast(message, 'error');
  }

  info(message: string): void {
    this.showToast(message, 'info');
  }

  warning(message: string): void {
    this.showToast(message, 'warning');
  }
}
