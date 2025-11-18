import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateExerciseRecordDto {
  @IsString()
  workoutId: string;
  @IsString()
  exerciseId: string;
  @IsInt()
  @Min(1)
  reps: number;
  @IsInt()
  @Min(1)
  sets: number;
}
