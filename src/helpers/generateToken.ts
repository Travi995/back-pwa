import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async(id:number) => {
    const payload = {
        id,
    }

    return await jwt.sign(payload, process.env.SECRETORPUBLICKEY as string,{expiresIn:'2d'})
}