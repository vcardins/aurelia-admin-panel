export class AuthFilterValueConverter  {
    toView(routes, isAuthenticated){        
        if(isAuthenticated) {
            return routes;
        }
        return routes.filter(r => !r.config.auth);
    }
}