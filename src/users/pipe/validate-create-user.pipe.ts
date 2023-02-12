import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { createUserDto } from '../DTOs/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: createUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe');
    console.log(value);
    console.log(metadata);

    // convert age value from string to number so it can pass as validated
    const parseAgeInt = parseInt(value.age.toString());
    if (isNaN(parseAgeInt)) {
      // if it's not a number or quote wrapped number e.g abc, james
      console.log(`${value.age} is not a number!`);
      throw new HttpException(
        'Invalid Data Type for property age. Expected Number',
        HttpStatus.BAD_REQUEST,
      );
    }
    // else if it a number wrapped in quotation mark
    console.log(`${parseAgeInt} is a number, returning...`);
    return { ...value, age: parseAgeInt }; // override the age to accept the converted new value
  }
}

// NOTE:

// We can use pipes for validation and transformation of data (on post)
// it part of the validationPipe called in control but that one is use to formalise DTO
