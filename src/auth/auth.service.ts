import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from '../users/dto/createUser.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService) { }
    
    async singIn(user: any) {
        if (!user)
            throw new BadRequestException('Unauthenticated user');

        let userExist = await this.userService.findUserByEmail(user.email);

        if (!userExist)
            userExist = await this.registerUser(user);

        return this.generateJwtToken({
            sub: userExist.id,
            email: userExist.email,
        });
    }

    async registerUser(createUser: createUserDto) {
        try {
            return await this.userService.createUser(createUser);
        }
        catch (err) {
            throw new InternalServerErrorException();
        }
    }

    generateJwtToken(payload: any) {
        return this.jwtService.sign(payload);
    }
}
