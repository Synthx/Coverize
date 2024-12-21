import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from '../service/auth.service';
import { switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);

	if (req.url.startsWith(environment.url)) {
		return authService.token$.pipe(
			switchMap((token) => {
				const newReq = req.clone({
					headers: req.headers.set('Authorization', `Bearer ${token}`),
				});

				return next(newReq);
			}),
		);
	}

	return next(req);
};
