
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Transaction } from "./transaction";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text',{ unique: true,nullable:false })
  label: string; // Ejemplo: "Food", "Transport", "Health"

  @Column('text',{nullable:false })
  color: string; // Ejemplo: "Comida", "Transporte", "Salud"

  @Column('text',{nullable:false })
  icon: string; 

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
 
}
