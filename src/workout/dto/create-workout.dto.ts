import { IsDateString, IsOptional, IsString } from "class-validator"

export class CreateWorkoutDto {
@IsString()
userId: string;
@IsDateString()
date: string;
@IsOptional()
@IsString()
description?: string;
}
