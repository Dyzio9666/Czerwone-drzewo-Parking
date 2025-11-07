import { Body, Controller, Post } from '@nestjs/common';
import { loggingDto } from 'src/dto /singInData.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){

    }



    @Post('signIn')
    async SignIn(@Body() payload : loggingDto){
        return await this.authService.signIn(payload.username , payload.password)
    }
    @Post('login')
    async login(@Body() payload : loggingDto){
        
        return await this.authService.loginIn(payload.username , payload.password)
    }
}
