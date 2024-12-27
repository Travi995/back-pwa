import { typeTransaction, typeTransactionEnum } from './../enum/entities';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./user";

import { Category } from "./category";
 
  @Entity()
  export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("decimal", { precision: 10, scale: 2 }) // Monto con decimales
    amount: number;
  
    @Column('enum',{enum:typeTransactionEnum})
    typeTransaction:typeTransaction;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date: Date; // Fecha y hora asignada automáticamente por el servidor

  // relations
    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn()
    user: User; // Relación con un usuario
  
    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn()
    category: Category; // Relación con una categoría
  }
  