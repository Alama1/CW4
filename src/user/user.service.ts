import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './interfaces/user.interface';
import { User } from './user.entity';
import { UserRoleEnum } from '../enums/users/roles';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    ) {}

    async updateUserRole(
        userEmail: string,
        newRole: UserRoleEnum,
    ): Promise<User> {
        const user = await this.usersRepository.findOneOrFail({
            where: `email = "${userEmail}"`,
        });
        user.role = newRole;

        return this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: { id },
        });
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        return this.usersRepository.findOne({
            where: `email = "${userEmail}"`,
        });
    }

    async createUser(user: Partial<UserInterface>): Promise<UserInterface> {
        return this.usersRepository.save({
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            role: UserRoleEnum[user.role],
        });
    }

    async updateUserScore(userEmail: string, newScore: number): Promise<User> {
        const user = await this.usersRepository.findOneOrFail({
            where: `email = "${userEmail}"`,
        });
        user.score = newScore;

        return this.usersRepository.save(user);
    }

    async updateTestPassed(userEmail: string, passed: boolean) {
        const user = await this.usersRepository.findOneOrFail({
            where: `email = "${userEmail}"`,
        });
        user.startTestPassed = passed;

        return this.usersRepository.save(user);
    }
}
