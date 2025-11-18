import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';
import { IsBoolean } from 'class-validator';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
    @IsBoolean()
    active: boolean;
}
