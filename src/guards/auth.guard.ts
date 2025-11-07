import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from 'express';
@Injectable()
export class authGuard implements CanActivate{
    constructor(
        private readonly jwtService : JwtService
    ){

    }
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request : Request = context.switchToHttp().getRequest();

        const token = await this.extractTokenFromHeader(request);
        
        try{
            const payload = this.jwtService.verify(token)
            const userID = payload.userID;
            request['user'] =payload
        }
        catch(e){
            throw new Error('Invalid Token')
        }
        return true;
    }
    async extractTokenFromHeader(request : Request) : Promise<string >{
        const [type , token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : '';
    }

}