import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && user.password_hash === pass) {
            const { password_hash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserInterface): Promise<object> {
        const payload = { email: user.email, sub: user.name, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
