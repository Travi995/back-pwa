import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { typeMoneyEnum } from "../enum/entities";

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
