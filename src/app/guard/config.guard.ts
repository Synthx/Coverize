import type { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DialogService } from '../service/dialog.service';
import { ConfigService } from '../service/config.service';
import { map } from 'rxjs';
import { ConfigDialogComponent } from '../component/config-dialog/config-dialog.component';

export const configGuard: CanActivateFn = () => {
	const dialogService = inject(DialogService);
	const configService = inject(ConfigService);

	const config = configService.config;
	if (config) return true;

	return dialogService
		.open$<boolean>(ConfigDialogComponent, {
			disableClose: true,
		})
		.pipe(map((result) => !!result));
};
