import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExerciseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createExerciseDto: CreateExerciseDto) {
    return this.exercise.create({
      data: createExerciseDto
    });
  }

  findAll() {
    return this.exercise.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.exercise.update({
      where: { id },
      data: updateExerciseDto
    });
  }

  remove(id: string) {
    return this.exercise.delete({ where: { id } });
  }
}
