import express, { Application } from "express";
import cors from 'cors'
import { routerAuth } from "../routes/auth/auth";
import { db } from "../db/db";
import { routerTransaction } from "../routes/transaction/transaction";
import { routerCategories } from "../routes/categories/categories";
import { routeMoney } from "../routes/money/money";
import { routesUser } from "../routes/user/user";

export class Server {
    public app : Application
    public port:number
    public pathAuth:string
    public pathUser:string
    public pathTransaction:string
    public pathCategories:string
    public pathMoney:string

    constructor(){
        this.app =  express()
        this.port = parseInt(process.env.PORT || "3000")
        this.pathAuth = '/api/auth'
        this.pathUser = '/api/user'
        this.pathTransaction = '/api/transaction'
        this.pathCategories = '/api/categories'
        this.pathMoney = '/api/money'
        
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
        this.app.use(this.pathUser,routesUser )
        this.app.use(this.pathTransaction,routerTransaction )
        this.app.use(this.pathCategories,routerCategories )
        this.app.use(this.pathMoney,routeMoney )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}