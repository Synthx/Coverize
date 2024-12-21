import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../model/track';
import { environment } from '../../environment/environment';
import type { Album } from '../model/album';
import type { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	#httpClient = inject(HttpClient);

	findAlbum(id: string): Observable<Album> {
		return this.#httpClient.get<Album>(`${environment.url}/albums/${id}`);
	}
}
