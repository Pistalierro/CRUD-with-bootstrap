import {ErrorHandler, inject, Injectable, Injector} from '@angular/core';
import {ErrorSignalService} from '../services/error-signal.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  handleError(error: any): void {
    let err: Error;
    if (error instanceof Error) {
      err = error;
    } else if (typeof error === 'string') {
      err = new Error(error);
    } else {
      err = new Error('Неизвестная ошибка');
    }

    const errorSignalService = this.injector.get(ErrorSignalService);
    errorSignalService.setError(error);

    console.log('Глобальная ошибка', err);
  }
}
