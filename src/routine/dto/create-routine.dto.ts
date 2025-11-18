import { IsOptional, IsString } from "class-validator";

export class CreateRoutineDto {
  @IsString()
  name: string;
  @IsString()
  userId: string;
  @IsOptional()
  @IsString()
  description?: string;
}
