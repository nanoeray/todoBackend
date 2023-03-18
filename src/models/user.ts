import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config'

interface UserAttr {
    id: number;
    name: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttr, 'id'> {}
export interface UserOuput extends Required<UserAttr> {}

class User extends Model<UserAttr, UserInput> implements UserOuput {
    public id!: number
    public name!: string
    public email!: string
    public password!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default User