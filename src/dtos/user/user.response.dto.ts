import { UserInterface } from '../../user/interfaces/user.interface';
import { UserRoleEnum } from '../../enums/users/roles';

export class UsersResponseDto {
    readonly id?: number;

    readonly name: string;

    readonly email: string;

    readonly password_hash: string;

    readonly role: UserRoleEnum;

    readonly testPassed: boolean;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(data?: Partial<UserInterface>) {
        if (data) {
            this.id = data.id;
            this.role = data.role;
            this.name = data.name;
            this.email = data.email;
            this.testPassed = data.testPassed;
            this.createdAt = data.createdAt;
        }
    }
}
