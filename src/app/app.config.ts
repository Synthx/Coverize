import {
	type ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
	HttpClient,
	provideHttpClient,
	withInterceptors,
} from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environment/environment';
import { getPerformance, providePerformance } from '@angular/fire/performance';

const httpLoaderFactory = (http: HttpClient) =>
	new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideHttpClient(withInterceptors([tokenInterceptor])),
		provideRouter(appRoutes, withComponentInputBinding()),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		providePerformance(() => getPerformance()),
		provideTranslateService({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
};
