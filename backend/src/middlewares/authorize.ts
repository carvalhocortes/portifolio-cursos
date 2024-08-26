import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import errorMessages from '../common/errorMessages';
import EnumProfiles from '../enums/EnumProfiles';

const jwtSecret = 'UkBN0me9JRvODL8Olb9iszmWxuOYt74OJEeTfFtiajbTScOGL6iFcMjepagitemzj4DqbHtKV6JokQpdZg8u96EHRUklWoQV3HjSm2PlQdC8hekOlSUWZPTjcMn8DvHdFwkkG7FC63N9yRnHQwAPNuNXNWZfoXlZZNbwirr2t7LLUV5rw9uE8CBEghVQt1KWH9284t5RxmVBtDpSSOs3rITMj6Sh8L9m2tu0KwGszdH45Scl2rce4RIS9Qr8fYS3'

export const authorize = (requiredPermission: EnumProfiles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = getValidAuthorization(req);
      const token = gerValidToken(authorization);
      checkTokenAndAudience(token, requiredPermission);
      next();
    } catch (error: any) {
      res.status(error.httpCode).json({ message: error.msg })
    }
  }
}

export const getEmailFromAuthorizationToken = (authorization: string): string => {
  const token = authorization.split(' ')[1];
  const { email } = verify(token, jwtSecret) as JwtPayload;
  return email;
}

const getValidAuthorization = ({ headers}: Request): string => {
  const { authorization } = headers;
  if (!authorization) throw errorMessages.unauthorizedAccess();
  return authorization
}

const gerValidToken = (authorization: string): string => {
  const [type, token] = authorization.split(' ');
  if (type !== 'Bearer' || !token) throw errorMessages.unauthorizedAccess();
  return token
}

const checkTokenAndAudience = (token: string, permission: EnumProfiles): string | JwtPayload => {
  try {
    return verify(token, jwtSecret, { audience: permission });
  } catch (error) {
    throw errorMessages.forbiddenAccess();
  }
}