import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService:ConfigService) {
        super({
            clientID: configService.get('CLIENTID'),
            clientSecret: configService.get('CLIENTSECRECT'),
            callbackURL: configService.get('CALLBACKURL'),
            scope: ['profile', 'email']
        });
    }
    
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        const {name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstname: `${name.givenName}`,
            lastname: `${name.familyName}`,
            picture: photos[0].value,
        };
        done(null, user);
    }
}