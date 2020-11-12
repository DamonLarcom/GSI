//@ts-check
/**
 * A Route
 * @typedef {{method: string, path: string, handlers: [(req: import("express").Request, res: import("express").Response)=>void]}} Route
 */

/**
 * @type {Route[]}
 */
export const Routes = [
    {
        method: "GET",
        path: "/",
        handlers: [(req, res) => {res.send('Hello!')}]
    }
]