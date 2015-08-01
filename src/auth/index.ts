import {Aurelia, inject} from 'aurelia-framework';
export {AuthService} from './authService';
export {AuthorizeStep} from './authorizeStep';
import {BaseConfig} from './baseConfig';

export function configure(aurelia:Aurelia, configCallback){
	aurelia.globalizeResources('../authFilter');

	var baseConfig = aurelia.container.get(BaseConfig);	
	if(configCallback !== undefined && typeof(configCallback) === 'function')
	{
		configCallback(baseConfig);
	}
};