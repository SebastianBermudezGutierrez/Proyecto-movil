import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseRecordService } from './exercise-record.service';
import { CreateExerciseRecordDto } from './dto/create-exercise-record.dto';
import { UpdateExerciseRecordDto } from './dto/update-exercise-record.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Asegúrate de que este archivo exista

@ApiTags('exercise-records')
@ApiBearerAuth() // Para Swagger
@UseGuards(JwtAuthGuard) // Aplica el guard a todos los endpoints del controlador
@Controller('exercise-record')
export class ExerciseRecordController {
  constructor(private readonly exerciseRecordService: ExerciseRecordService) {}

  @Post()
  create(@Body() createExerciseRecordDto: CreateExerciseRecordDto) {
    return this.exerciseRecordService.create(createExerciseRecordDto);
  }

  @Get()
  findAll() {
    return this.exerciseRecordService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseRecordDto: UpdateExerciseRecordDto) {
    return this.exerciseRecordService.update(id, updateExerciseRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseRecordService.remove(id);
  }

  @Delete('workout/:workoutId')
  removeByWorkoutId(@Param('workoutId') workoutId: string) {
    return this.exerciseRecordService.removeByWorkoutId(workoutId);
  }
}
