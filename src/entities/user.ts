import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from "typeorm";
import { Transaction } from "./transaction";
  
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    name: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]; // Relación con transacciones
  }
  