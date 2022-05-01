type TNames = 'ValidationError' | 'UnauthorizedError' | 'ForbiddenError' | 'BadRequestError' | 'NotFoundError' | 'ConflictError' | 'InternalServerError';
type TStatusCodes = 400 | 401 | 403 | 404 | 409 | 500;

const errorCodeMap = new Map<TNames, TStatusCodes>([
  ['ValidationError', 400],
  ['UnauthorizedError', 401],
  ['ForbiddenError', 403],
  ['BadRequestError', 400],
  ['NotFoundError', 404],
  ['ConflictError', 409],
  ['InternalServerError', 500],
]);

export default class AppError extends Error {
  statusCode: any;
  status: string;
  isOperational: boolean;
  reason: string | undefined;

  constructor(name: TNames, message: string | undefined, reason?: string) {
    super(message);
    this.name = name;
    this.reason = typeof reason === 'undefined' ? '' : reason;
    this.statusCode = errorCodeMap.get(name);
    this.status = `${errorCodeMap.get(name)}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      reason: this.reason,
    };
  }

  toString() {
    if (this.reason !== '') {
      return `${this.name}: ${this.message}. Reason: ${this.reason}.`;
    }
    return `${this.name}: ${this.message}.`;
  }

  toApiResponse() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
    };
  }
}
