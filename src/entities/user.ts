import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,})
    @IsEmail()
    email:string

    @Column()
    @IsString()
    name:string

    @Column()
    @IsNotEmpty()
    @Length(8,255)
    password:string

    
}