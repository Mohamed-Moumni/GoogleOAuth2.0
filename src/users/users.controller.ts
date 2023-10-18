import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userGuard } from '../auth/guards/jwt-Auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Get('/me')
    @UseGuards(userGuard)
    async getUser(@Req() req: Request) {
        const user = req.user;
        return user;
    }

    @Get('/:userId')
    @UseGuards(userGuard)
    async getUserById(@Req() req: Request, @Param('userId') userId:string) {
        return await this.userService.findUserById(userId);
    }

    @Get('/me/avatar')
    @UseGuards(userGuard)
    async getUserAvatar(@Req() req: Request)
    {
        const user = req.user;
        return await this.userService.findAvatarByUserId(user['id']);
    }
}
