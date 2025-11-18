import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsBoolean } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    @IsBoolean()
    active: boolean;
}
