// src/workout/dto/workout-filter.dto.ts
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class WorkoutFilterDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}