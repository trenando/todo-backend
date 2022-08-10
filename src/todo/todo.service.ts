import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Json } from 'sequelize/types/utils';
import { UpdateTodoDto } from 'src/dto/ChangeTodo.dto';
import { CreateTodoDto } from 'src/dto/CreateTodo.dto';
import { TodoResponse } from 'src/responses/TodoResponses';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo) private todoRepository: typeof Todo) { }

    public async createTodo(dto: CreateTodoDto): Promise<void> {
        await this.todoRepository.create(dto)
    }

    public async getAllTodo(): Promise<Array<TodoResponse>> {
        const todos = await this.todoRepository.findAll()
        return todos;
    }

    public async getTodoById(todoId: number): Promise<TodoResponse> {
        const todo = await this.todoRepository.findByPk(todoId)

        if (!todo) throw new HttpException("Такой задачи не существует", HttpStatus.BAD_REQUEST)
        
        return todo;
    }

    public async updateTodo(dto: UpdateTodoDto): Promise<TodoResponse> {
        let todo = await this.todoRepository.findOne({ where: { id: dto.id } })

        if (JSON.stringify(todo) === JSON.stringify(dto)) throw new HttpException("Нет новых данных, попробуйте снова", HttpStatus.BAD_REQUEST)

        todo.set({
            ...dto
        })

        todo = await todo.save()

        return todo;
    }

    public async deleteTodo(todoId: number): Promise<void> {
        await this.todoRepository.destroy({ where: { id: todoId } })
    }
}
