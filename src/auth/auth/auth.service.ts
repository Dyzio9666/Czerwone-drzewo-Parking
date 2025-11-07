import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { refreshTokenEntity } from 'src/entity/refreshtoken.entity';
import {v4 as uuidv4} from  'uuid'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(userEntity) private readonly userEntity : Repository<userEntity>,
        private readonly jwtService : JwtService,
        @InjectRepository(refreshTokenEntity) private readonly refreshTokenEntity : Repository<refreshTokenEntity>
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
    async loginIn(username : string , password : string){
        const user = await this.userEntity.findOneBy({username : username})
        if (!user){
            throw new HttpException("User does not exist " , HttpStatus.BAD_REQUEST)

        }
        let  PasswordCompatioson = await bcrypt.compare(password ,user.password)
        if (!PasswordCompatioson){
            throw new HttpException("Invalid Credentials" , HttpStatus.BAD_REQUEST)

        }
        const token = await this.genereteToken(user.id)
        return {
            ...token,
            username
        }

    }

    async genereteToken(userID){
        const payload = {
            sub : userID
        }
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = uuidv4()
        await this.storeRefreshToken(refreshToken , userID)
        // console.log(accessToken)
        // console.log(accessToken)
        return {accessToken, refreshToken}

    }


    async storeRefreshToken(token :string , userID:string){
        const expairyDate = new Date()
        expairyDate.setDate(expairyDate.getDate() + 3)
        const refreshToken = this.refreshTokenEntity.create({userID : userID , token, expiryDate : expairyDate})
        await this.refreshTokenEntity.save(refreshToken)
    }
    async refreshToken(refreshToken : string){
        const token = await this.refreshTokenEntity.findOneBy({token : refreshToken})
        if(!token){
            throw  new HttpException("Invalid refresh token" , HttpStatus.BAD_REQUEST)
        }
        if(token.expiryDate < new Date()){
            throw new UnauthorizedException("Referesh token expired")
        }
        return this.genereteToken(token.userID)
    }
}
