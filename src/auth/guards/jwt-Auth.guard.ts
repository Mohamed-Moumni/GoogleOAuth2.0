import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/users.service";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class userGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private configService: ConfigService) { }


    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        const token: string = req.headers.cookie.split('=')[1] as string;

        if (!token)
            return false;

        const secret = this.configService.get('JWT_SECRET');
        const payload = await this.jwtService.verifyAsync(token, { secret: secret });
        const user = await this.userService.findUserByEmail(payload.email);
        req['user'] = user;
        return true;
   }
}