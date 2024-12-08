import express, { Application } from "express";
import cors from 'cors'
import { routerAuth } from "../routes/auth/auth";
import { db } from "../db/db";
import { routerTransaction } from "../routes/transaction/transaction";
import { routerCategories } from "../routes/categories/categories";

export class Server {
    public app : Application
    public port:number
    public pathAuth:string
    public pathTransaction:string
    public pathCategories:string

    constructor(){
        this.app =  express()
        this.port = parseInt(process.env.PORT || "3000")
        this.pathAuth = '/api/auth'
        this.pathTransaction = '/api/transaction'
        this.pathCategories = '/api/categories'
        
        this.middleaware()
        this.loadDb()
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

    async loadDb(){
        try {
            await db.initialize()
            console.log("Base de datos cargada")
        } catch (error) {
            console.log("Error al cargar la base de datos",error)
        }
    }

    routes(){
        this.app.use(this.pathAuth,routerAuth )
        this.app.use(this.pathTransaction,routerTransaction )
        this.app.use(this.pathCategories,routerCategories )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}