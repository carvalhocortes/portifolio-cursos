import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import errorMessages from '../common/errorMessages';
import EnumProfiles from '../enums/EnumProfiles';


export default class AuthorizationMiddleware {
  private jwtSecret = String(process.env.JWT_SECRET)
  private receivedPermission: string;

  constructor(permission: string) {
    this.receivedPermission = permission;
  }

  checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
    try {
      const validPermission = this.validatePermission(this.receivedPermission);
      const authorization = this.getValidAuthorization(req);
      const token = this.getValidToken(authorization);
      this.checkTokenAndAudience(token, validPermission);
      next();
    } catch (error: any) {
      res.status(error.httpCode).json({ message: error.msg })
    }
  }

  private validatePermission(permission: string): EnumProfiles {
    if (Object.values(EnumProfiles).includes(permission as EnumProfiles)) return permission as EnumProfiles;
    throw errorMessages.invalidPermission()
  }

  private getValidAuthorization({ headers }: Request): string {
    const { authorization } = headers;
    if (!authorization) throw errorMessages.unauthorizedAccess();
    return authorization
  }

  private getValidToken(authorization: string): string {
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) throw errorMessages.unauthorizedAccess();
    return token
  }

  private checkTokenAndAudience(token: string, permission: EnumProfiles): string | JwtPayload {
    try {
      return verify(token, this.jwtSecret, { audience: permission });
    } catch (error) {
      throw errorMessages.forbiddenAccess();
    }
  }
}
