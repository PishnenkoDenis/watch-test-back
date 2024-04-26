import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ServerMessages } from '../config';

export function unauthorizedError() {
  throw new UnauthorizedException();
}

export function invalidDataError(message?: string) {
  throw new ForbiddenException({
    message: message || ServerMessages.INVALID_DATA,
    error: message || ServerMessages.INVALID_DATA,
    statusCode: HttpStatus.BAD_REQUEST,
  });
}

export function forbiddenError(message?: string) {
  throw new ForbiddenException({
    message: message || ServerMessages.FORBIDDEN,
    error: message || ServerMessages.FORBIDDEN,
    statusCode: HttpStatus.FORBIDDEN,
  });
}

export function conflictError(message?: string) {
  throw new ConflictException({
    message: message || ServerMessages.CONFLICT,
    error: message || ServerMessages.CONFLICT,
    statusCode: HttpStatus.CONFLICT,
  });
}

export function unprocessableEntityError() {
  throw new UnprocessableEntityException({
    message: ServerMessages.UNPROCESSABLE_ENTITY,
    error: ServerMessages.UNPROCESSABLE_ENTITY,
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
}

export function badRequestError(message?: string) {
  throw new BadRequestException({
    message: message || ServerMessages.BAD_REQUEST,
    error: message || ServerMessages.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
  });
}

export function expiredTokenError() {
  throw new HttpException('TOKEN_EXPIRED', HttpStatus.UNAUTHORIZED);
}
