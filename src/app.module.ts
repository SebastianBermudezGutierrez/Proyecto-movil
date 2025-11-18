import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RoutineExerciseModule } from './routine-exercise/routine-exercise.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseRecordModule } from './exercise-record/exercise-record.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), UserModule, RoutineModule, ExerciseModule, RoutineExerciseModule, WorkoutModule, ExerciseRecordModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
