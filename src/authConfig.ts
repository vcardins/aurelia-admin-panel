let configForDevelopment = {
	baseUrl: 'http://localhost:4500/',
	loginRedirect: '#/flickr',
	providers: {
		google: {
			clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
		} 
		,
		linkedin:{
			clientId:'778mif8zyqbei7'
		},
		facebook:{
			clientId:'1452782111708498'
		}
	}
};

let configForProduction = {
	providers: {
		google: {
			clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
		} 
		,
		linkedin:{
			clientId:'7561959vdub4x1'
		},
		facebook:{
			clientId:'1653908914832509'
		}

	}
};
const config:any = (window.location.hostname==='localhost') ? 
				 configForDevelopment :
				 configForProduction;


export { config as default };
