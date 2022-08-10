import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { UpdateTodoDto } from "src/dto/ChangeTodo.dto";
import { CreateTodoDto } from "src/dto/CreateTodo.dto";
import { ErrorResponse } from "src/responses/ErrorResponses";
import { CreateTodoResponse, DeleteTodoResponse, TodoResponse } from "src/responses/TodoResponses";
import { TodoService } from "./todo.service";

@ApiTags("todo")
@Controller("todo")
export class TodoController {
    constructor(private todoService: TodoService) { }

    @ApiOperation({})
    @ApiCreatedResponse({
        type: CreateTodoResponse
    })
    @ApiBadRequestResponse({
        type: ErrorResponse
    })
    @Post("create")
    public async create(@Res() res: Response<CreateTodoResponse | ErrorResponse>, @Body() dto: CreateTodoDto) {
        try {
            await this.todoService.createTodo(dto);
            return res.status(HttpStatus.CREATED).json({
                message: "Задача успешно создана"
            })
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }

    @ApiOperation({})
    @ApiOkResponse({
        type: [TodoResponse]
    })
    @ApiBadRequestResponse({
        type: ErrorResponse
    })
    @Get("all")
    public async getAll(@Res() res: Response<Array<TodoResponse> | ErrorResponse>) {
        try {
            const todos = await this.todoService.getAllTodo()
            return res.status(HttpStatus.OK).json(todos)
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }

    @ApiOperation({ operationId: "todoId" })
    @ApiParam({
        name: "todoId",
        required: true,
        example: 3
    })
    @ApiOkResponse({
        type: TodoResponse
    })
    @ApiBadRequestResponse({
        type: ErrorResponse
    })
    @Get(":todoId")
    public async getOneById(@Res() res: Response<TodoResponse | ErrorResponse>, @Param() param: { todoId: number }) {
        try {
            const todo = await this.todoService.getTodoById(param.todoId)
            return res.status(HttpStatus.OK).json(todo)
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }

    @ApiOperation({})
    @ApiOkResponse({
        type: TodoResponse
    })
    @ApiBadRequestResponse({
        type: ErrorResponse
    })
    @Put("change")
    public async change(@Res() res: Response<TodoResponse | ErrorResponse>, @Body() todoDto: UpdateTodoDto) {
        try {
            const todo = await this.todoService.updateTodo(todoDto)
            return res.status(HttpStatus.BAD_REQUEST).json(todo)
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }

    @ApiOperation({ operationId: "delete/todoId" })
    @ApiParam({
        name: "todoId",
        required: true,
        example: 3
    })
    @ApiOkResponse({
        type: DeleteTodoResponse
    })
    @ApiBadRequestResponse({
        type: ErrorResponse
    })
    @Delete("delete/:todoId")
    public async delete(@Res() res: Response<DeleteTodoResponse | ErrorResponse>, @Param() param: { todoId: number }) {
        try {
            await this.todoService.deleteTodo(param.todoId)
            return res.status(HttpStatus.OK).json({
                message: "Задача успешно удалена",
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }
}
