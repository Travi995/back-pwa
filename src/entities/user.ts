import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Transaction } from "./transaction";
import { TypeMoney } from "./typeMoney";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  amount: number;

  @Column()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[]; 

  @ManyToOne(() => TypeMoney, { eager: true }) 
  @JoinColumn({ name: "type_money_id" }) 
  type: TypeMoney;
}
