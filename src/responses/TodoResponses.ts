import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoResponse {
  @ApiProperty({
    example: "Задача успешно создана",
    required: true,
  })
  readonly message: string
}

export class TodoResponse {
  @ApiProperty({
    example: 3,
    required: true,
  })
  readonly id: number;

  @ApiProperty({
    example: "Новый заголовок",
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: "новый контент",
    required: true,
  })
  readonly content: string;

  @ApiProperty({
    example: false,
    required: true,
  })
  readonly isCompleted: boolean;
}

export class DeleteTodoResponse {
  @ApiProperty({
    example: "Задача успешно удалена",
    required: true,
  })
  readonly message: string
}