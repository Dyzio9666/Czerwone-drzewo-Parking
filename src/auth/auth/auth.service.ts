import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(userEntity) private readonly userEntity : Repository<userEntity>,
        private readonly jwtService : JwtService    
    ){

    }


    async signIn(username : string , password : string){
        
        const user  = await this.userEntity.findOneBy({username : username})
        if(user){
            throw new HttpException("Username alraedy in use" , HttpStatus.BAD_REQUEST)

        }
        const becryptedPassword = await bcrypt.hash(password,10)
        const newUser = await this.userEntity.create({username : username, password : becryptedPassword})
        this.userEntity.save(newUser)
        

    }


}
