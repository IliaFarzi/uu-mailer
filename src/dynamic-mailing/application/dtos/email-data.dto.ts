import { IsNotEmpty, IsEmail } from '@nestjs/class-validator';
import {
  EmailDataForgotPasswordInterface,
  EmailDataSignupInterface,
} from '../../domain/interfaces/email-data.interface';

export class EmailDataSignupDto implements EmailDataSignupInterface {
  @IsNotEmpty()
  @IsEmail()
  to: string;
  @IsNotEmpty()
  data: {
    hash: string;
  };
}

export class EmailDataForgotPasswordDto
  implements EmailDataForgotPasswordInterface
{
  @IsNotEmpty()
  @IsEmail()
  to: string;
  @IsNotEmpty()
  data: {
    hash: string;
  };
}
