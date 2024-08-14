import { HttpException, HttpStatus } from '@nestjs/common';
import { GenericResponse } from '../customer';
import { ERROR_STATUS_CODE } from './status';

export const MessageCode = {
  INVALIDATE_PHONE_NUMER: ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER,
};

export const MESSAGE_VALIDATION = {
  [MessageCode.INVALIDATE_PHONE_NUMER]: {
    statusCode: HttpStatus.BAD_REQUEST,
    bussinessCode: ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER,
    message: 'Phone number is invalited trackingId: {trackingId}',
  },
};

export const handleErrorResponse = (
  errorCode: number,
  trackingId?: string,
): GenericResponse => {
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
