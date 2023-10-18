import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userGuard } from '../auth/guards/jwt-Auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Get('/me')
    @UseGuards(userGuard)
    async getUser(@Req() req: Request) {
        const user = req['user'];
        return user;
    }
}
