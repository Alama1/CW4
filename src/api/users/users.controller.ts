import {
    Get,
    Post,
    Body,
    Param,
    Controller,
    Headers,
    ConflictException,
    BadRequestException,
    NotFoundException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { UserService } from '../../user/user.service';
import { UsersResponseDto } from '../../dtos/user/user.response.dto';
import { UserUpdateRoleDto } from '../../dtos/user/user.updateRole.dto';
import { Roles } from '../../decorators/roles.decorator';
import { UserUpdateDriverDto } from '../../dtos/user/user.updateDriver.dto';
import { UserRoleEnum } from '../../enums/users/roles';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    @Roles('ADMIN')
    @Get()
    async findAll(): Promise<UsersResponseDto[]> {
        try {
            const users = await this.userService.getAllUsers();
            return users.map((user) => new UsersResponseDto(user));
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Roles('ADMIN')
    @Get(':userId')
    async findOne(@Param('userId') id: number): Promise<UsersResponseDto> {
        let user;
        try {
            user = await this.userService.getUserById(id);
        } catch (e) {
            throw new BadRequestException();
        }
        if (!user) throw new NotFoundException();
        return user;
    }

    @Roles('admin', 'manager')
    @Post('updateDriverRole')
    @UsePipes(new ValidationPipe())
    async updateDriverRole(@Body() data: UserUpdateDriverDto): Promise<UsersResponseDto> {
        let user;
        try {
            user = await this.userService.getUserByEmail(data.email);
        } catch (e) {
            throw new NotFoundException();
        }
        if (!user) throw new NotFoundException();

        if (user.role === 'ADMIN' || user.role === 'MANAGER') {
            throw new BadRequestException('You can\'t update role of that user!');
        }
        return new UsersResponseDto(
            await this.userService.updateUserRole(user.email, UserRoleEnum.MEDIC),
        );
    }

    @Roles('admin')
    @Post('updateRole')
    @UsePipes(new ValidationPipe())
    async updateRole(@Body() data: UserUpdateRoleDto): Promise<UsersResponseDto> {
        try {
            const user = await this.userService.updateUserRole(data.email, data.role);
            return new UsersResponseDto(user);
        } catch (error) {
            if (error.code === 'ER_WARN_DATA_TRUNCATED') {
                throw new ConflictException('User role is not valid');
            } else {
                throw new BadRequestException();
            }
        }
    }

    @Post('testScore')
    @UsePipes(new ValidationPipe())
    async updateScore(@Headers('authorization') header) {
        const JWTUser = this.jwtService.verify(header.split(' ')[1])
        const user = await this.userService.getUserByEmail(JWTUser.email);
        console.log(user);
    }
}
