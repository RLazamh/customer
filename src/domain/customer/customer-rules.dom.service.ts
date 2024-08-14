import { Injectable } from '@nestjs/common';
import { ERROR_STATUS_CODE } from 'src/application/utils';

@Injectable()
export class CustomerRulesDomService {
  validatePhoneNumber(phone: string) {
    if (phone.slice(0, 2) !== '09') {
      throw ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER;
    }
  }
}
