import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Injectable()
export class ParseIntCustomMsgPipe extends ParseIntPipe {
  constructor(private propertyName: string) {
    super();
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch {
      throw new BadRequestException(
        `${this.propertyName} must be a valid an integer.`,
      );
    }
  }
}
