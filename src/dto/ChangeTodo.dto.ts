import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { CreateTodoDto } from "./CreateTodo.dto";

export class UpdateTodoDto extends CreateTodoDto {
    @ApiProperty({
        example: 4,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({
        example: false,
        required: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    readonly isCompleted: boolean;
}