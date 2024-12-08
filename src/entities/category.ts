
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  label: string; // Ejemplo: "Food", "Transport", "Health"

  @Column()
  color: string; // Ejemplo: "Comida", "Transporte", "Salud"

  @Column()
  icon: string; 

  
}
