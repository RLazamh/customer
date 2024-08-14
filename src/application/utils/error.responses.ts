import { HttpException, HttpStatus } from '@nestjs/common';
import { GenericResponse } from '../customer';
import { ERROR_STATUS_CODE } from './status';

const MessageCode = {
  INVALIDATE_PHONE_NUMER: ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER,
  ERROR_DB: ERROR_STATUS_CODE.ERROR_DB,
  CUSTOMER_ALREADY_EXISTS: ERROR_STATUS_CODE.CUSTOMER_ALREADY_EXISTS,
};

const MESSAGE_VALIDATION = {
  [MessageCode.INVALIDATE_PHONE_NUMER]: {
    statusCode: HttpStatus.BAD_REQUEST,
    bussinessCode: ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER,
    message: 'Phone number is invalited trackingId: {trackingId}',
  },
  [MessageCode.ERROR_DB]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    bussinessCode: ERROR_STATUS_CODE.ERROR_DB,
    message: 'Error in DB unexpected error trackingId: {trackingId}',
  },
  [MessageCode.CUSTOMER_ALREADY_EXISTS]: {
    statusCode: HttpStatus.BAD_REQUEST,
    bussinessCode: ERROR_STATUS_CODE.CUSTOMER_ALREADY_EXISTS,
    message: 'Customer already exists trackingId: {trackingId}',
  },
};

export const handleErrorResponse = (
  errorCode: number,
  trackingId?: string,
): GenericResponse => {
  // TODO: If error is a number throw else throw generic error
  const response = MESSAGE_VALIDATION[errorCode];
  response.message = response.message.replace('{trackingId}', trackingId);
  throw new HttpException(
    {
      statusCode: response.statusCode,
      businessCode: response.bussinessCode,
      message: response.message,
    },
    response.statusCode,
  );
};
