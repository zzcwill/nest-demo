import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    let val = parseInt(value, 10);
		console.info(val)
		val = 10
    // if (isNaN(val)) {
    //   throw new BadRequestException('Validation failed');
    // }

    return val;
  }
}