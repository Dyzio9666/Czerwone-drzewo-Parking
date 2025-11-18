import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class userEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string
    @Column()
    username : string
    @Column()
    password : string
    @Column({nullable : true})
    role : string
}