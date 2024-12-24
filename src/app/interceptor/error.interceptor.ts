import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../service/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const toastService = inject(ToastService);

	return next(req).pipe(
		catchError((err) => {
			if (err instanceof HttpErrorResponse) {
				toastService.open('Oops ! Something went wrong', 'error');
			}

			return throwError(() => err);
		}),
	);
};
