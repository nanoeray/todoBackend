import User, {UserInput, UserOuput} from '../models/user'

export const getById = async (id: number): Promise<UserOuput> => {
    const row = await User.findByPk(id)
    if (!row) {
        throw new Error('not found')
    }
    return row
}

export const getByEmail = async (email: string): Promise<UserOuput> => {
    const row = await User.findOne({where: {email: email}})
    if (!row) {
        throw new Error('not found')
    }
    return row
}