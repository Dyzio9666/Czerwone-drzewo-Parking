import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('refresh-token')
export class refreshTokenEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    userID :string 
    @Column()
    token : string
    @Column()
    expiryDate : Date
}