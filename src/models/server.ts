import express, { Application } from "express";
import cors from 'cors'

export class Server {
    public app : Application
    public port:number

    constructor(){
        this.app =  express()
        this.port = parseInt(process.env.PORT || "3000")

    }

    middleaware(){

        //habilitacion del cors
        this.app.use(cors())

        //informacion via json
        this.app.use(express.json())

        //servir la carpeta public
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}