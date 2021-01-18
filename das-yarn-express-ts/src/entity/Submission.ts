import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Submission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    proj1: string;

    @Column()
    proj2: string;

    @Column()
    lastOpened: Date;

    @Column()
    dateCreated: Date;

}
