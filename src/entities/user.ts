import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
 
} from "typeorm";
import { Transaction } from "./transaction";
import { rolsEnum } from "../enum/rols";
import { typeMoneyEnum } from "../enum/entities";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment',)
  id: number;

  @Column('text',{unique: true,nullable:false })
  email: string;

  @Column('text',{nullable:true})
  name: string;

  @Column( 'numeric',{ default: 0 })
  amount: number;

  @Column('enum',{enum: typeMoneyEnum,nullable:true })
  currency: typeMoneyEnum;

  @Column('text',{select:false})
  password: string;

  @Column('enum',{enum:rolsEnum,nullable:false})
  roleUser: rolsEnum;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[]; 

 
}
