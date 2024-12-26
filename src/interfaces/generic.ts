import { Request } from "express";

export interface ReqExtends extends Request{
    id:number
}