import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export class reservationsEntity{
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    made_by : string
    @Column()
    date : string
    
}
