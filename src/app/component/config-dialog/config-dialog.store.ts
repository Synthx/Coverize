import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import type { Config } from '../../model/config';
import { finalize } from 'rxjs';
import { DialogService } from '../../service/dialog.service';
import { ConfigService } from '../../service/config.service';
import { ConfigDialogComponent } from './config-dialog.component';

@Injectable()
export class ConfigDialogStore {
	#authService = inject(AuthService);
	#configService = inject(ConfigService);
	#dialogService = inject(DialogService);

	#loading = signal(false);

	loading = this.#loading.asReadonly();

	save(config: Config) {
		this.#loading.set(true);

		this.#authService
			.getAuthToken(config.clientId, config.clientSecret)
			.pipe(finalize(() => this.#loading.set(false)))
			.subscribe({
				next: () => {
					this.#configService.config = config;
					this.#dialogService.close(ConfigDialogComponent, true);
				},
			});
	}
}
