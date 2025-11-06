import { Body, Controller, Post } from '@nestjs/common';
import { signInDataDto } from 'src/dto /singInData.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){

    }



    @Post('signIn')
    async SignIn(@Body() payload : signInDataDto){
        return await this.authService.signIn(payload.username , payload.password)
    }
}
