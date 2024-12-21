import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
import { User } from "./user";

import { Category } from "./category";
import { typeMoneyEnum } from "../enum/entities";
 
  @Entity()
  export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("decimal", { precision: 10, scale: 2 }) // Monto con decimales
    amount: number;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date: Date; // Fecha y hora asignada automáticamente por el servidor


    @Column('enum',{enum: typeMoneyEnum,nullable:false })
    currency: typeMoneyEnum;


  // relations
    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn()
    user: User; // Relación con un usuario
  
    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn()
    category: Category; // Relación con una categoría
  }
  