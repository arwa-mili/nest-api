import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInvalidException extends HttpException {
  constructor() {
    super('Invalid email', HttpStatus.BAD_REQUEST);
  }
}

export class AccessDeniedException extends HttpException {
  constructor() {
    super('Access Denied', HttpStatus.FORBIDDEN);
  }
}
