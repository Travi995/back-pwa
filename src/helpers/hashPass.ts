import bcrypt from "bcryptjs";


export const hashPass = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}