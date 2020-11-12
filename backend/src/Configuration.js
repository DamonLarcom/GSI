import { MONGOURL, SESSION } from "./keys";
import { Routes } from "./Routes";

export default class Configuration {
    dbURL = MONGOURL;
    app;
    constructor(instance) {
        this.app = instance;
        this.configureRoutes(Routes);
    }

    prop(obj, key) {
        return obj[key].bind(obj);
    }

    configureRoutes(routes) {
        routes.forEach(route => {
            console.log(route);
            this.app[route.method.toLowerCase()](route.path, route.handlers);
        });
    }
}