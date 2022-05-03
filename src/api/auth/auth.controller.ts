import { AuthGuard } from '@nestjs/passport';
import {
    Post,
    Body,
    HttpCode,
    Controller,
    Request,
    ConflictException,
    BadRequestException,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UsersRequestDto } from '../../dtos/user/user.request.dto';
import { AuthService } from '../../auth/auth.service';
import { Public } from '../../guards/publickey';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {
    }

    @Public()
    @Post('register')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async create(@Body() data: UsersRequestDto){
        try {
            await this.userService.createUser(data);
            return { response: 'Registration successful!' };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User with this email already exists');
            } else {
                throw new BadRequestException();
            }
        }
    }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        const jwt = this.authService.login(req.user);
        return Object.assign(await jwt, req.user);
    }
}
