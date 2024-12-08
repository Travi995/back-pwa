
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum typeMoneyEnum {
    USD = "USD",
    EUR = "EUR",
    CUP = "CUP",
}


//entidad para el tipo de moneda
@Entity()
export class TypeMoney extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: typeMoneyEnum,
        default: typeMoneyEnum.USD, // Moneda predeterminada
    })
    value: typeMoneyEnum;
}
