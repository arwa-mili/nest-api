import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
      }
    
      handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        if (err || !user) {
          throw new ForbiddenException(); 
        }
        return user;
      }

}
