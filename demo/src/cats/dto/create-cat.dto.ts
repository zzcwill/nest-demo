import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  ValidateIf,
} from 'class-validator';

export class CreateCatDto {  
  @MinLength(1, {
      message: 'name不能为空',
  })
  @IsString()
  readonly name: string;

  @ValidateIf(obj => {
    return obj && typeof obj.age !== 'undefined';
  })  
  @IsString({
      message: '无效的age',
  })
  readonly age: number;
}