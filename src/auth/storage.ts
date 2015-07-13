import {inject} from 'aurelia-framework';
import {IAuthConfig, BaseConfig} from './baseConfig';

interface IStorage {
	getItem(key:string): any;
	setItem(key:string, value:any): void;
	removeItem(key:string): void;
}

@inject(BaseConfig)
export class Storage{
	
	private config:IAuthConfig;
	private isStorageAvailable:boolean = true;
	private storage:IStorage;
	
	constructor(private baseConfig:BaseConfig){
		this.config = baseConfig.current;
		switch (this.config.storage) {
			case 'localStorage':
				this.storage = window.localStorage;
				if (!('localStorage' in window && window['localStorage'] !== null)) {		
					this.isStorageAvailable = false;	
					console.warn('Warning: Local Storage is disabled or unavailable');
				}
				break;
			case 'sessionStorage':
				this.storage = window.sessionStorage;
				if (!('sessionStorage' in window && window['sessionStorage'] !== null)) {			
					console.warn('Warning: Session Storage is disabled or unavailable. Will not work correctly.');
					this.isStorageAvailable = false;
				}
				break;
		}
	}

	get(key:string){
		return this.storage.getItem(key);
	}

	set(key:string, value:any){
		return this.storage.setItem(key, value);
	}

	remove(key:string){
		return this.storage.removeItem(key);
	}

}