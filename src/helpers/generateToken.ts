import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (id:number) => {
    const payload = {
        id,
    }

    return  jwt.sign(payload, process.env.SECRETORPUBLICKEY as string,{expiresIn:'2d'})
}