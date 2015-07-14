
export interface IAppConfig {
    appErrorPrefix: string;
    title:  string;
    description:  string;
    grantType:  string;
    authStorageType:  string;
    sessionKey:  string;
    api : {
        host : string;
        signIn : string;
        baseUrl : string;
        storage : string;
        clientId: string;
        geoLocation: string;
    };
    signalR : {
        defaultHub : string;
        chatHub : string;
    };
    mapCenter :{
        latitude: number;
        longitude: number;
    };
    lockScreenTimeout:number;
    defaultRoute : string;
    version: string;
    playSounds : boolean;
    name: String;
    year: number
}

 let appName = 'authSpa',
    hosts = {
        dev : 'http://localhost:4500/', 
        staging : 'http://apistaging.techsapp.com/',
        production : 'https://api.techsapp.com/'
    },
    storage = {
        //dev : 'http://127.0.0.1:10000/devstoreaccount1/',
        dev : 'https://techsappstorage.blob.core.windows.net/',
        staging : 'http://techsappstaging.blob.core.windows.net/',
        production : 'https://techsappstorage.blob.core.windows.net/'
    },
    env = (window.location.hostname==='localhost') ? 'dev' : 'production';

const appConfig:IAppConfig = {
    appErrorPrefix: '[MasterApp Error] ',
    title: 'MasterApp',
    description: 'MasterApp',
    grantType: 'password',
    authStorageType: 'localStorage',
    sessionKey: appName + '.auth_data',
    api : {
        host : hosts[env],
        signIn : hosts[env] + 'token',
        baseUrl : hosts[env] + 'api/',
        storage : storage[env],
        clientId: 'localTechsappSPA',
        geoLocation : 'http://api.geonames.org/'
    },
    signalR : {
        defaultHub : 'MessagingHub',
        chatHub : 'ChatHub'
    },
    mapCenter :{
        latitude: 37.09024,
        longitude: -95.712891
    },
    lockScreenTimeout:1,
    defaultRoute : 'app.maps',
    version: '1.0.0',
    playSounds : true,
    name: 'Master Spa',
    year: ((new Date()).getFullYear())
};  

export { 
    appConfig as default 
};