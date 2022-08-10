import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [
    SequelizeModule.forFeature([Todo])
  ]
})
export class TodoModule { }
