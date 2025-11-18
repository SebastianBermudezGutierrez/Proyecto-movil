import {IsInt, IsString, Min } from "class-validator"

export class CreateRoutineExerciseDto {
@IsString()
  routineId: string;
  @IsString()
  exerciseId: string;
  @IsInt()
  @Min(1)
  reps: number;
  @IsInt()
  @Min(1)
  sets: number;
}
