import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./user";
import { TypeMoney } from "./typeMoney";
import { Category } from "./category";
 
  @Entity()
  export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("decimal", { precision: 10, scale: 2 }) // Monto con decimales
    amount: number;
  
    @Column({ type: "date" })
    date: Date;
  
    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn()
    user: User; // Relación con un usuario
  
    @ManyToOne(() => TypeMoney, (currency) => currency.id)
    @JoinColumn()
    currency: TypeMoney; // Relación con un tipo de moneda
  
    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn()
    category: Category; // Relación con una categoría
  }
  