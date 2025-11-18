import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      }
    });
  }

  findAll() {
    return this.user.findMany({
      orderBy: { 
        created_at: 'desc' }
    });
  }

  async findByEmail(email: string) {
    return this.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
      return this.user.update({
        where: { id },
        data: updateUserDto
      });
    }

  remove(id: string) {
    return this.user.delete({where: { id }});
  }
}
