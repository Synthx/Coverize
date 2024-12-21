import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-spotify-icon',
	templateUrl: './spotify-icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyIconComponent {}
