import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorSignalService {

  private currentError = signal<Error | null>(null);

  get error() {
    return this.currentError;
  }

  setError(error: Error): void {
    this.currentError.set(error);
  }

  clearError(): void {
    this.currentError.set(null);
  }
}
