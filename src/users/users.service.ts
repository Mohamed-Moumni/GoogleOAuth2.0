import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }
    
    async createUser(createUser: createUserDto) {
        return await this.prismaService.user.create({
            data: {
                email: createUser.email,
                firstname: createUser.firstname,
                lastname: createUser.lastname,
                picture: createUser.picture
            }
        });
    }

    async findUserById(userId: string) {
        return await this.prismaService.user.findFirst({
            where: {
                id: userId,
            }
        });
    }

    async deleteUserById(userId: string) {
        await this.prismaService.user.delete({
            where: {
                id: userId,
            }
        });
    }

    async findUserByEmail(Email: string) {
        console.log(Email);
        return await this.prismaService.user.findUnique({
            where: {
                email: Email,
            }
        });
    }
}
