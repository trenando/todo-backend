import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TodoCreationAttrs {
    title: string;
    content: string;
}

@Table({ tableName: "todo", timestamps: false })
export class Todo extends Model<Todo, TodoCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.STRING, allowNull: false })
    content: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isCompleted: boolean
}