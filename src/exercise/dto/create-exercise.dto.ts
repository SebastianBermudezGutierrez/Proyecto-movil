import { IsOptional, IsString } from "class-validator";

export class CreateExerciseDto {
@IsString()
  name: string;
@IsString()
@IsOptional()
  description: string;
@IsString()
  muscle: string;
}
