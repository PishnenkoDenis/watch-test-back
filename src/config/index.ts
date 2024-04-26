import { ForbiddenException, HttpStatus } from '@nestjs/common';

export enum ERoles {
  owner = 'OWNER',
  vendor = 'VENDOR',
  customer = 'CUSTOMER',
}

export enum Envs {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 32;

export const VALID_PASSWORD_REGEXP = new RegExp(
  `^(?=.*[0-9])(?=.*[~\`!\\s@#$%^&*()_+={\\[}\\]|\\\\:;"'<,>.?/-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~\`!\\s@#$%^&*()_+={\\[}\\]|\\\\;"'<,>.?/-]{${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}}$`,
);

export const rolesValues = Object.values(ERoles);

export enum ServerMessages {
  OK = 'OK',
  CREATED = 'CREATED',
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  SHOP_ALREADY_EXIST = 'SHOP_ALREADY_EXIST',
  INVALID_DATA = 'INVALID_DATA',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  USER_BLOCKED = 'USER_BLOCKED',
  EMAIL_BLOCKED = 'EMAIL_BLOCKED',
  EMAIL_ALREADY_SENT = 'EMAIL_ALREADY_SENT',
  FILE_ALREADY_EXIST = 'FILE_ALREADY_EXIST',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  INVALID_FILE_SIZE = 'INVALID_FILE_SIZE',
  INVALID_FILE_MIMETYPE = 'INVALID_FILE_MIMETYPE',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  NOT_FOUND = 'NOT_FOUND',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  NO_PERMISSION = 'NO_PERMISSION',
  NOT_PAID = 'NOT_PAID',
}

export const serverResponseOK = {
  success: true,
  message: ServerMessages.OK,
  statusCode: HttpStatus.OK,
};

export function forbiddenError(message?: string) {
  throw new ForbiddenException({
    message: message || ServerMessages.FORBIDDEN,
    error: message || ServerMessages.FORBIDDEN,
    statusCode: HttpStatus.FORBIDDEN,
  });
}
