import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import type { AuthToken } from '../model/auth-token';
import { map, type Observable, tap } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	#httpClient = inject(HttpClient);
	#configService = inject(ConfigService);

	#token?: AuthToken;

	get token$(): Observable<string> {
		const token = this.#token;
		if (token) {
			// todo: check if not expired
		}

		const config = this.#configService.config;
		if (!config) {
			throw new Error('Cannot find config');
		}

		return this.getAuthToken(config.clientId, config.clientSecret).pipe(
			map((authToken) => authToken.access_token),
		);
	}

	getAuthToken(clientId: string, clientSecret: string): Observable<AuthToken> {
		const payload = new HttpParams()
			.set('grant_type', 'client_credentials')
			.set('client_id', clientId)
			.set('client_secret', clientSecret);

		return this.#httpClient
			.post<AuthToken>('https://accounts.spotify.com/api/token', payload)
			.pipe(
				tap((authToken) => {
					this.#token = authToken;
				}),
			);
	}
}
