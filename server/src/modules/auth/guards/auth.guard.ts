import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = this.authService.verifyToken(token);
      console.log(user);
      if (!user) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }

    // const user: ICurrentUser = this.authService.verifyToken(userAccessToken);

    // if (!user) {
    //   return false;
    // }
    // gqlContext.user = user;

    // // Handle roles
    // const role = this.reflector.get<Role>('role', context.getHandler());
    // if (!role) {
    //   return true;
    // }

    // if (user && user.role && this.checkRoles(user.role, role)) {
    //   return true;
    // }
  }

  // private checkRoles(userRole: Role, role: Role): boolean {
  //   const adminAccess = [Role.Admin, Role.Maintainer, Role.StandardUser];
  //   const maintainerAccess = [Role.Maintainer, Role.StandardUser];
  //   const standardAccess = [Role.StandardUser];

  //   switch (userRole) {
  //     case Role.Admin:
  //       return adminAccess.includes(role);
  //     case Role.Maintainer:
  //       return maintainerAccess.includes(role);
  //     case Role.StandardUser:
  //       return standardAccess.includes(role);
  //     default:
  //       return false;
  //   }
  //   return false;
  // }
}
