import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaClient } from '@prisma/client';
import { WorkoutFilterDto } from './dto/workout-filter.dto';

@Injectable()
export class WorkoutService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createWorkoutDto: CreateWorkoutDto) { 
    return this.workout.create({
      data: createWorkoutDto
    });
  }

  findAll() {
    return this.workout.findMany({
      orderBy: { 
        createdAt: 'desc' 
      }
    });
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return this.workout.update({
      where: { id },
      data: updateWorkoutDto
    });
  }

  // Dentro de la clase WorkoutService en workout.service.ts
  async findByDateRange(filter: WorkoutFilterDto) {
    const { userId, startDate, endDate } = filter;
    return this.workout.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc', // Ordenar por fecha ascendente
      },
    });
  }

  remove(id: string) {
    return this.workout.delete({ where: { id } });
  }
}
