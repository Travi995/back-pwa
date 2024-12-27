import jwt from "jsonwebtoken";
import "dotenv/config";
import { tpPayloadJWT } from "../types/jwt";

export const generateToken = (data:tpPayloadJWT) => {
    const payload = {
        ...data
    }

    return  jwt.sign(payload, process.env.SECRETORPUBLICKEY as string,{expiresIn:'2d'})
}