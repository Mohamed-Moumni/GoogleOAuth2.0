import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-Oauth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(GoogleOauthGuard)
    @Get('google')
    async auth(@Req() req:Request) {
        
    }
}
