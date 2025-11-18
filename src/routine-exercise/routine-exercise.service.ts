import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoutineExerciseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createRoutineExerciseDto: CreateRoutineExerciseDto) {
    return this.routineExercise.create({
      data: createRoutineExerciseDto
    });
  }

  findAll() {
    return this.routineExercise.findMany({
      orderBy: { 
        createdAt: 'desc' 
      }
    });
  }

  update(id: string, updateRoutineExerciseDto: UpdateRoutineExerciseDto) {
    return this.routineExercise.update({
      where: { id },
      data: updateRoutineExerciseDto
    });
  }

  remove(id: string) {
    return this.routineExercise.delete({ where: { id } });
  }

  async findByWorkoutId(workoutId: string) {
    return this.exerciseRecord.findMany({
      where: { workoutId },
      include: {
        exercise: true,
        workout: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
