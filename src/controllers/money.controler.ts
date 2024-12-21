import { Request, Response } from "express";
import { User } from "../entities/user";


export const createMoney = async (req:any,res:any)=>{

    try {
        const { typeCoin, value, id } = req.body;
        
        const user = await User.findOne({
            where: { id: id },
            relations: ["type"], // Aseguramos traer el tipo de moneda actual
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // let typeMoney = await TypeMoney.findOne({ where: { value: typeCoin } })

        // if (!typeMoney) {
        //     typeMoney = new TypeMoney();
        //     typeMoney.value = typeCoin;
        //     await typeMoney.save();
        // }

        // // Asignar la relación al usuario
        // user.type = typeMoney;
        // user.amount = value;
        // await user.save();

        // const {password,...element} =  user

        // res.json({message:'Moneda agregada',user:element})
    } catch (error) {
        res.status(500).json({message:'Error al agregar la moneda',error})
    }
    
}