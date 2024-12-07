import express, { Application } from "express";
import cors from 'cors'
import { routerAuth } from "../routes/auth/auth";

export class Server {
    public app : Application
    public port:number
    public pathAuth:string

    constructor(){
        this.app =  express()
        this.port = parseInt(process.env.PORT || "3000")
        this.pathAuth = '/api/auth'
        
        this.middleaware()
        this.routes()
    }

    middleaware(){

        //habilitacion del cors
        this.app.use(cors())

        //informacion via json
        this.app.use(express.json())

        //servir la carpeta public
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.pathAuth,routerAuth )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}