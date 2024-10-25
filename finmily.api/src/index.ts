import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import config from "./configuration/config"
const cors = require('cors');

import auth from "./middleware/auth"

// create express app
const app = express()
app.use(bodyParser.json())
// app.use(auth)

app.use(cors());

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})


app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Server started on http://localhost:${config.port}`)

    try {
        await AppDataSource.initialize();
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error", error)
    }
})
