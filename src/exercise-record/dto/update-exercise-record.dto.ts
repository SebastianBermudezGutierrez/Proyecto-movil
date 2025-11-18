import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseRecordDto } from './create-exercise-record.dto';
import { IsBoolean } from 'class-validator';

export class UpdateExerciseRecordDto extends PartialType(CreateExerciseRecordDto) {
    @IsBoolean()
    active: boolean;
}
