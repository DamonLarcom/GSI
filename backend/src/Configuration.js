//@ts-check
// import { MONGOURL } from "./keys";
import { Routes } from "./Routes";

export default class Configuration {
    // dbURL = MONGOURL;
    /**@type {import("express").Application} */
    app;
    /**
     * @param {import("express").Application} instance
     */
    constructor(instance) {
        this.app = instance;
        this.configureRoutes(Routes);
    }   

    /**
     * @param {any} obj
     * @param {any} key
     */
    prop(obj, key) {
        return obj[key].bind(obj);
    }

    /**
     * @param {import("./Routes").Route[]} routes
     */
    configureRoutes(routes) {
        routes.forEach(route => {
            this.app[route.method.toLowerCase()](route.path, route.handlers);
        });
    }
}