import { Module } from '@nestjs/common';
import { ExerciseRecordService } from './exercise-record.service';
import { ExerciseRecordController } from './exercise-record.controller';

@Module({
  controllers: [ExerciseRecordController],
  providers: [ExerciseRecordService],
})
export class ExerciseRecordModule {}
