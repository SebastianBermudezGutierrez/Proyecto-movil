import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutineExerciseService } from './routine-exercise.service';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Asegúrate de que este archivo exista

@ApiTags('routine-exercises')
@ApiBearerAuth() // Para Swagger
@UseGuards(JwtAuthGuard) // Aplica el guard a todos los endpoints del controlador
@Controller('routine-exercise')
export class RoutineExerciseController {
  constructor(private readonly routineExerciseService: RoutineExerciseService) {}

  @Post()
  create(@Body() createRoutineExerciseDto: CreateRoutineExerciseDto) {
    return this.routineExerciseService.create(createRoutineExerciseDto);
  }

  @Get()
  findAll() {
    return this.routineExerciseService.findAll();
  }

  @Get('workout/:workoutId')
  findByWorkoutId(@Param('workoutId') workoutId: string) {
    return this.routineExerciseService.findByWorkoutId(workoutId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineExerciseDto: UpdateRoutineExerciseDto) {
    return this.routineExerciseService.update(id, updateRoutineExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routineExerciseService.remove(id);
  }
}
