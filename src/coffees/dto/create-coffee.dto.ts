import { IsString, IsInt } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;
}
