import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-Oauth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async auth(@Req() req:Request) {
        
    }

    @Get('/google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.singIn(req.user);
        console.log(token);
        res.cookie('jwt', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        });
        res.redirect('http://localhost:3000/api/');
    }
}
