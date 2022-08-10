import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTodoDto {
  @ApiProperty({
    example: "my first todo",
    maxLength: 255,
    required: true,
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: "make some tea with js",
    maxLength: 255,
    required: true,
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly content: string;
}