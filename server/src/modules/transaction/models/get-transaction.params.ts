import { IsInt, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetTransactionParams {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  skip?: number;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  @Transform((value) => value.toUpperCase())
  orderDir?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  typeId: Number;
}
