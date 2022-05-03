import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

import { UserInterface } from './interfaces/user.interface';
import { UserRoleEnum } from '../enums/users/roles';

@Entity()
@Unique('email', ['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
      id: number;

  @Column({ type: 'varchar', length: 32, nullable: false, unique: false })
      name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
      email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
      password_hash: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
      role: UserRoleEnum;

  @Column({type: 'boolean', nullable: false, default: false})
      startTestPassed: boolean;

  //Score based on first test, can be increased or decreased with re-test 0 - 100
  @Column({type: 'int', nullable: false, default: 0})
      score: number;

  @CreateDateColumn({ update: false })
      createdAt: Date;

  @UpdateDateColumn({ update: true })
      updatedAt: Date;
}
