import { Injectable } from '@angular/core';
import type { Config } from '../model/config';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	#config?: Config;

	get config(): Config | undefined {
		let config = this.#config;
		if (config) {
			return config;
		}

		const rawConfig = localStorage.getItem('config');
		if (!rawConfig) {
			return undefined;
		}

		config = JSON.parse(rawConfig);

		this.#config = config;

		return config;
	}

	set config(config: Config) {
		this.#config = config;

		const rawConfig = JSON.stringify(config);
		localStorage.setItem('config', rawConfig);
	}
}
