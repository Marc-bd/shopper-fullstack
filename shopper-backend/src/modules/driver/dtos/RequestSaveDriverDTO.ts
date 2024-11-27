import { IsNotEmpty, IsString } from 'class-validator';

export class RequestSaveDriverDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
