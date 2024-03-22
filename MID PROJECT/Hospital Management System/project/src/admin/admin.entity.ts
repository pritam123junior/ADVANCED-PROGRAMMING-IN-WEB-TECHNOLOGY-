import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('Doctor_Info')
export class DoctorEntity{
    @PrimaryGeneratedColumn()
    DoctorID:number;

    @Column({ length: 100 })
    fullName: string;
    @Column({ length: 256 })
    Qualification:string;
    @Column({ unsigned: true })
    salary: number;
    @Column({ length: 124 })
    Email: string;
    @Column({length:130})
    PhoneNumber:string
    @Column({unsigned:true})
    Schedule:string;

}
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    @Unique(['email'])
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    dob: Date;
  
    @Column()
    phone: string;
  
    @Column()
    address: string;
  
    @Column()
    imageUrl: string;
  }
  
  @Entity('OTP')
  export class OTP_Entity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    otp: string;
  
    @Column()
    email: string;
  
    @Column()
    status: number;
  }
@Entity('Nurse_info')
export class NurseEntity{

}
