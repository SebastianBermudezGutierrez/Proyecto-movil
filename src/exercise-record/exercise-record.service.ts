import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExerciseRecordDto } from './dto/create-exercise-record.dto';
import { UpdateExerciseRecordDto } from './dto/update-exercise-record.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExerciseRecordService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createExerciseRecordDto: CreateExerciseRecordDto) {
    return this.exerciseRecord.create({
      data: createExerciseRecordDto
    });
  }

  findAll() {
    return this.exerciseRecord.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  update(id: string, updateExerciseRecordDto: UpdateExerciseRecordDto) {
    return this.exerciseRecord.update({
      where: { id },
      data: updateExerciseRecordDto
    });
  }

  remove(id: string) {
    return this.exerciseRecord.delete({ where: { id } });
  }

  async removeByWorkoutId(workoutId: string) {
    return this.exerciseRecord.deleteMany({
      where: { workoutId }
    });
  }
}
