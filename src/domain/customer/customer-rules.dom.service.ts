import { Injectable } from '@nestjs/common';
import { ERROR_STATUS_CODE } from '../../application/utils';
import { PHONE_PREFIX } from '../constants.dom';

@Injectable()
export class CustomerRulesDomService {
  validatePhoneNumber(phone: string): void {
    if (phone.slice(0, 2) !== PHONE_PREFIX) {
      throw ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER;
    }
  }
}
