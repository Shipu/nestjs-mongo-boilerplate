// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/http';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
//
// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     // throw new HttpException(
//     //   'You do not have permission',
//     //   HttpStatus.UNAUTHORIZED,
//     // );
//     const request = context.switchToHttp().getRequest();
//     try {
//       const token = request.headers.authorization;
//       const cleanToken = token.replace('Bearer', '').trim();
//
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       const decode = new JwtService().decode(cleanToken);
//       request.user = decode;
//       console.log(request.user);
//
//       return !!decode;
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   }
// }
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(err, user, info);
    if (err || !user) {
      throw err || new UnauthorizedException(info);
    }

    return user;
  }
}
