import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SpotifyIconComponent } from './component/icon/spotify-icon/spotify-icon.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, TranslatePipe, SpotifyIconComponent],
})
export class AppComponent {}
