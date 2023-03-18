import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config'

interface TodoAttr {
    id: number;
    title: string;
    userId?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface TodoInput extends Optional<TodoAttr, 'id'> {}
export interface TodoOutput extends Required<TodoAttr> {}

class Todo extends Model<TodoAttr, TodoInput> implements TodoOutput {
    public id!: number
    public title!: string
    public userId!: number
    public status!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Todo.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Todo