import { HttpStatus } from '@nestjs/common';
import { GenericResponse } from '../customer';
import { SUCCESSFUL_STATUS_CODE } from './status';

export const MessageCode = {
  CUSTOMER_CREATED: SUCCESSFUL_STATUS_CODE.CUSTOMER_CREATED,
};

export const MESSAGE_VALIDATION = {
  [MessageCode.CUSTOMER_CREATED]: {
    statusCode: HttpStatus.CREATED,
    bussinessCode: SUCCESSFUL_STATUS_CODE.CUSTOMER_CREATED,
    message: 'Successfully customer generated trackingId: {trackingId}',
  },
};

export const handleResponse = (
  successCode: number,
  trackingId?: string,
): GenericResponse => {
  const response = MESSAGE_VALIDATION[successCode];
  response.message = response.message.replace('{trackingId}', trackingId);
  return response;
};
