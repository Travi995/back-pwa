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
  @PrimaryGeneratedColumn('increment',)
  id: number;

  @Column('text',{unique: true,nullable:false })
  email: string;

  @Column('text',{nullable:true})
  name: string;

  @Column( 'numeric',{ default: 0,nullable:true })
  amount: number;

  @Column('text',{select:false})
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[]; 

 
}
