import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {

  @ApiProperty({
    example: "Текст ошибки",
    required: true,
  })
  readonly message:string
}