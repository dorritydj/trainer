// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import Pocketbase from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Pocketbase;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
