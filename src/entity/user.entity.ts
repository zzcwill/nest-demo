import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Index } from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Index({ unique: true })
  @Column({
    length: 11,
    nullable: false
  })
  username: string;
  
  @Column({
    length: 255,
    nullable: false
  })
  password: string;  

  @Column({
    length: 255,
    nullable: false,
  })
  salt: string; 

  @Column('int',{
    nullable: true, 
    default: null 
  })
  level: number;   

  @Column('tinyint',{
    nullable: false, 
    default: 1
  })
  is_on_duty: number;  

  @Exclude()
  @Column(
    'datetime', { 
      nullable: false,
      name: 'last_login_time', 
      default: () => 'CURRENT_TIMESTAMP' }
  )
  last_login_time: Date;  
  
  
  @Column(
    'datetime', { 
      nullable: false,
      name: 'register_time', 
      default: () => 'CURRENT_TIMESTAMP' }
  )
  register_time: Date;   

  @Column({
    length: 255,
    nullable: true, 
    default: null 
  })
  openid: string;   
}